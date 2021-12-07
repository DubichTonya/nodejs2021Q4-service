export {}
const uuid = require('uuid');

const { getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex } = require('./board.memory.repository');
const { deleteTasksWithBoard } = require('../tasks/task.memory.repository');

const boardsData = getBoardData();

async function getAllBoards(req, reply) {
  reply.send(boardsData);
}

async function getBoardById(req, reply) {
  const { boardId } = req.params;
  const board =  findBoardById(boardId);

  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
}

async function createBoard(req, reply) {
  const board = { ...req.body, id: uuid.v4() };
  addBoard(board);

  reply.code(201).send(board);
}

async function updateBoard(req, reply) {
  const { boardId } = req.params;
  const boardIndex = findBoardByIndex(boardId)
  if (boardIndex === -1) {
    reply.code(400).send('Board not found');
  } else {
    updateBoardInData(boardIndex, req);

    reply.send(boardsData[boardIndex]);
  }
}

async function deleteBoard(req, reply) {
  const { boardId } = req.params;
  const boardIndex = findBoardByIndex(boardId)

  if (boardIndex === -1) {
    reply.code(404).send('Board not found');
  } else {
    deleteBoardFromData(boardIndex);
    deleteTasksWithBoard(boardId);
    reply.send('Board deleted');
  }
}

module.exports = {
  getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard
};

