const uuid = require('uuid');

let { boardsData } = require('./board.memory.repository');

async function getAllBoards(req, reply) {
  reply.send(boardsData);
}

async function getBoardById(req, reply) {
  const { boardId } = req.params;
  const board = boardsData.find(item => item.id === boardId);

  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
}

async function createBoard(req, reply) {
  const board = { ...req.body, id: uuid.v4() };
  boardsData = [ ...boardsData, board ];

  reply.code(201).send(board);
}

async function updateBoard(req, reply) {
  const { boardId } = req.params;
  const boardIndex = boardsData.findIndex(item => item.id === boardId);
  if (boardIndex === -1) {
    reply.code(400).send('Board not found');
  } else {
    boardsData[boardIndex] = { ...boardsData[boardIndex], ...req.body };

    reply.send(boardsData[boardIndex]);
  }
}

async function deleteBoard(req, reply) {
  const { boardId } = req.params;
  const boardIndex = boardsData.findIndex(item => item.id === boardId);

  if (boardIndex === -1) {
    reply.code(404).send('Board not found');
  } else {
    boardsData.splice(boardIndex, 1);
    reply.send('Board deleted');
  }
}

function getBoardsData() {
  return boardsData
}

module.exports = {
  getBoardsData, getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard
};

