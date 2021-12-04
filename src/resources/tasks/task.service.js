const uuid = require('uuid');
const {getBoardsData} = require('../boards/board.service')
const { tasksData } = require('./task.memory.repository');

async function getAllTasks(req, reply) {
  const {boardId} = req.params;

  const tasks = tasksData.filter(item => item.boardId === boardId);
  if(tasks){
    reply.send(tasks)
  } else {
    reply.code(401).send('Not found')
  }

}

async function getTaskById(req, reply) {
  const {boardId, taskId} = req.params;
  const taskById = tasksData.find((task => task.id === taskId));
  if(taskById && taskById.boardId === boardId){
    reply.code(200).send(taskById)
  } else {
    reply.code(404).send('Not found')
  }

  reply(tasksData[0])
}

async function createTask(req, reply) {
  const boardsData = getBoardsData();
  const {boardId} = req.params;
  const findBoardById = boardsData.find(board => board.id === boardId);

  if(findBoardById){
    const newTask = {
      id: uuid.v4(),
      ...req.body
    }
    newTask.boardId = boardId;
    tasksData.push(newTask);
    reply.code(201).send(newTask)
  } else {
    reply.code(401).send('Board not found')
  }

}

async function updateTask(req, reply) {
  const {boardId, taskId} = req.params;

  const findByIndex = tasksData.findIndex(task => task.id === taskId);

  if(findByIndex === -1){
    reply.code(404).send('Task not found')
  } else if(tasksData[findByIndex].boardId === boardId){
      tasksData[findByIndex] = {...req.body, id: taskId, boardId}
      const task = tasksData[findByIndex];
      reply.send(task);
    } else {
      reply.code(404).send('Task not found')
    }

}

async function deleteTask(req, reply) {
  const {boardId, taskId} = req.params;

  const findByIndex = tasksData.findIndex(task => task.id === taskId);

  if(findByIndex === -1){
    reply.code(401).send('Task not found')
  } else if(tasksData[findByIndex].boardId === boardId){
      tasksData.splice(findByIndex, 1);
      reply.code(204).send('Task deleted')
    } else {
      reply.code(401).send('Task not found')
    }
}

function getTaskData() {
  return tasksData;
}

module.exports = {
  getTaskData, getAllTasks, getTaskById, createTask, updateTask, deleteTask
};

