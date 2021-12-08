import { FastifyReply, FastifyRequest } from 'fastify';

interface column {
  title: string, order: number
}

interface IBoards {
  id?: string;
  title: string;
  columns: column[]
}

export {}
const uuid = require('uuid');

const { getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex } = require('./board.memory.repository.ts');
const { deleteTasksWithBoard } = require('../tasks/task.memory.repository.ts');

interface RequestParamsDefault {
  boardId: string;
}

const boardsData = getBoardData();

async function getAllBoards(req: FastifyRequest, reply: FastifyReply) {
  reply.send(boardsData);
}

async function getBoardById(req: FastifyRequest, reply: FastifyReply) {
  const { boardId } = <RequestParamsDefault>req.params;
  const board =  findBoardById(boardId);

  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
}

async function createBoard(req: FastifyRequest, reply: FastifyReply) {
  const body = <IBoards>req.body
  const board = { ...body, id: uuid.v4() };
  addBoard(board);

  reply.code(201).send(board);
}

async function updateBoard(req: FastifyRequest, reply: FastifyReply) {
  const { boardId } = <RequestParamsDefault>req.params;
  const boardIndex = findBoardByIndex(boardId)
  if (boardIndex === -1) {
    reply.code(400).send('Board not found');
  } else {
    updateBoardInData(boardIndex);
    reply.send(boardsData[boardIndex]);
  }
}

async function deleteBoard(req: FastifyRequest, reply: FastifyReply) {
  const { boardId } = <RequestParamsDefault>req.params;
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

