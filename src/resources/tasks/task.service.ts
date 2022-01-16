import { FastifyReply, FastifyRequest } from 'fastify';
import { getTaskByTaskId, getTaskData, getTaskIndexByTaskId, updateTaskDataByIndex } from './task.memory.repository';
import { connection } from '../../db';
import { getRepository } from 'typeorm';
import { TaskEntity } from '../../entities/Task';
import { BoardEntity } from '../../entities/Board';
import { UserEntity } from '../../entities/User';
import { ColumnEntity } from '../../entities/Column';


interface RequestParamsDefault {
    boardId: string;
    taskId: string;
}

interface RequestBodyDefault {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
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
    
    await connection
      .then(async () => {
          const tasks = await getRepository(TaskEntity).find({where: {boardId}});
          reply.send(tasks);
      })
      .catch(() => {
          reply.code(401).send('Not found');
      })
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
    const body = <RequestBodyDefault>req.body;
    let task: TaskEntity;
    await connection
      .then(async () => {
          task = getRepository(TaskEntity).create({
              ...body
          });
          if(body.boardId){
              const board = await getRepository(BoardEntity).findOne(body.boardId);
              task.board = board;
          }

          if(body.userId){
              const user = await getRepository(UserEntity).findOne(body.userId);
              task.user = user;
          }

          if(body.columnId){
              const column = await getRepository(ColumnEntity).findOne(body.columnId);
              task.column = column;
          }
          
          await getRepository(TaskEntity).save(task);
          reply.code(201).send(task);
      })
      .catch(() => {
          reply.code(401).send('Board not found');
      })
    
    // if (findBoardId) {
    //     const body = <RequestBodyDefault>req.body;
    //     const newTask = {
    //         id: uuid.v4(),
    //         ...body
    //     };
    //     newTask.boardId = boardId;
    //     addTask(newTask);
    //     reply.code(201).send(newTask);
    // } else {
    //     reply.code(401).send('Board not found');
    // }

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
    
    await connection
      .then(async () => {
          await getRepository(TaskEntity).delete(taskId);
          reply.send('Task deleted');
      })
      .catch(() => {
          reply.code(404).send('Task not found');
      })
}

export {
    getAllTasks, getTaskById, createTask, updateTask, deleteTask
};
