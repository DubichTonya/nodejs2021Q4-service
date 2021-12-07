const uuid = require('uuid');
const {getBoardData} = require('../boards/board.memory.repository')
const {getTaskData, getTaskByBoardId, getTaskByTaskId, addTask, getTaskIndexByTaskId, deleteTaskFromTasks,
  updateTaskDataByIndex
} = require('./task.memory.repository')

const tasksData = getTaskData();

async function getAllTasks(req, reply) {
  const {boardId} = req.params;

  const tasks = getTaskByBoardId(boardId);
  if(tasks){
    reply.send(tasks)
  } else {
    reply.code(401).send('Not found')
  }

}

async function getTaskById(req, reply) {
  const {boardId, taskId} = req.params;
  const taskById = getTaskByTaskId(taskId);
  if(taskById && taskById.boardId === boardId){
    reply.code(200).send(taskById)
  } else {
    reply.code(404).send('Not found')
  }

  reply(tasksData[0])
}

async function createTask(req, reply) {
  const boardsData = getBoardData();
  const {boardId} = req.params;
  const findBoardById = boardsData.find(board => board.id === boardId);

  if(findBoardById){
    const newTask = {
      id: uuid.v4(),
      ...req.body
    }
    newTask.boardId = boardId;
    addTask(newTask);
    reply.code(201).send(newTask)
  } else {
    reply.code(401).send('Board not found')
  }

}

async function updateTask(req, reply) {
  const {boardId, taskId} = req.params;
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

async function deleteTask(req, reply) {
  const { taskId } = req.params;
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
