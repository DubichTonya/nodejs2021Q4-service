import { FastifyReply, FastifyRequest } from 'fastify';

export {}
const uuid = require('uuid');
const {findBoardById} = require('../boards/board.memory.repository.ts')
const {getTaskData, getTaskByBoardId, getTaskByTaskId, addTask, getTaskIndexByTaskId, deleteTaskFromTasks,
  updateTaskDataByIndex
} = require('./task.memory.repository.ts')

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


async function getAllTasks(req: FastifyRequest, reply: FastifyReply) {
  const {boardId} = <RequestParamsDefault>req.params;

  const tasks = getTaskByBoardId(boardId);
  if(tasks){
    reply.send(tasks)
  } else {
    reply.code(401).send('Not found')
  }

}

async function getTaskById(req: FastifyRequest, reply: FastifyReply) {
  const {boardId, taskId} = <RequestParamsDefault>req.params;
  const taskById = getTaskByTaskId(taskId);
  if(taskById && taskById.boardId === boardId){
    reply.code(200).send(taskById)
  } else {
    reply.code(404).send('Not found')
  }
}

async function createTask(req: FastifyRequest, reply: FastifyReply) {
  const {boardId} = <RequestParamsDefault>req.params;
  const findBoardId = findBoardById(boardId)

  if(findBoardId){
    const body = <RequestBodyDefault>req.body
    const newTask = {
      id: uuid.v4(),
      ...body
    }
    newTask.boardId = boardId;
    addTask(newTask);
    reply.code(201).send(newTask)
  } else {
    reply.code(401).send('Board not found')
  }

}

async function updateTask(req: FastifyRequest, reply: FastifyReply) {
  const {boardId, taskId} = <RequestParamsDefault>req.params;
  const findByIndex = getTaskIndexByTaskId(taskId);

  if(findByIndex === -1){
    reply.code(404).send('Task not found')
  } else if(tasksData[findByIndex].boardId === boardId){
      updateTaskDataByIndex(findByIndex, req.body, taskId, boardId);
      reply.send(tasksData[findByIndex]);
    } else {
      reply.code(404).send('Task not found')
    }

}

async function deleteTask(req: FastifyRequest, reply: FastifyReply) {
  const { taskId } = <RequestParamsDefault>req.params;
  const taskIndex = getTaskIndexByTaskId(taskId);

  if (taskIndex === -1) {
    reply.code(404).send('Task not found');
  } else {
    deleteTaskFromTasks(taskIndex);
    reply.send('Task deleted');
  }
}

module.exports = {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask
};
