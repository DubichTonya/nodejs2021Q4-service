import { FastifyReply, FastifyRequest } from 'fastify';
import * as uuid from 'uuid';
import {
    getTaskData, getTaskByBoardId, getTaskByTaskId, addTask, getTaskIndexByTaskId, deleteTaskFromTasks,
    updateTaskDataByIndex
} from './task.memory.repository';

import { findBoardById } from '../boards/board.memory.repository';


interface RequestParamsDefault {
    boardId: string;
    taskId: string;
}

interface RequestBodyDefault {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
}


const tasksData = getTaskData();

/**
 * Router function which send all tasks on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply with tasks array on client
 */

async function getAllTasks(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId } = <RequestParamsDefault>req.params;

    const tasks = getTaskByBoardId(boardId);
    if (tasks) {
        reply.send(tasks);
    } else {
        reply.code(401).send('Not found');
    }

}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply on client with task which we found by id or send
 *     error code 400 if we not found task.
 */

async function getTaskById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId, taskId } = <RequestParamsDefault>req.params;
    const taskById = getTaskByTaskId(taskId);
    if (taskById && taskById.boardId === boardId) {
        reply.code(200).send(taskById);
    } else {
        reply.code(404).send('Not found');
    }
}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new task from body data and add this task in tasks
 *     array, we send new task on client.
 */

async function createTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId } = <RequestParamsDefault>req.params;
    const findBoardId = findBoardById(boardId);

    if (findBoardId) {
        const body = <RequestBodyDefault>req.body;
        const newTask = {
            id: uuid.v4(),
            ...body
        };
        newTask.boardId = boardId;
        addTask(newTask);
        reply.code(201).send(newTask);
    } else {
        reply.code(401).send('Board not found');
    }

}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success updated task from body data we send task on client, or send
 *     error with status code 400 if task not found in tasks array.
 */

async function updateTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId, taskId } = <RequestParamsDefault>req.params;
    const findByIndex = getTaskIndexByTaskId(taskId);

    if (findByIndex === -1) {
        reply.code(404).send('Task not found');
    } else if (tasksData[findByIndex].boardId === boardId) {
        await updateTaskDataByIndex(findByIndex, req);
        reply.send(tasksData[findByIndex]);
    } else {
        reply.code(404).send('Task not found');
    }

}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success deleted task from tasks array we send message on client that
 *     the task has been deleted. If we not found tasks we send error with status code 404.
 */

async function deleteTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { taskId } = <RequestParamsDefault>req.params;
    const taskIndex = getTaskIndexByTaskId(taskId);

    if (taskIndex === -1) {
        reply.code(404).send('Task not found');
    } else {
        deleteTaskFromTasks(taskIndex);
        reply.send('Task deleted');
    }
}

export {
    getAllTasks, getTaskById, createTask, updateTask, deleteTask
};
