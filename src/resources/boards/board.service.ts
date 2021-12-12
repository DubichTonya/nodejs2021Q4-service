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

/**
 * Router function which send all boards on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply with boards array on client
 */

async function getAllBoards(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  reply.send(boardsData);
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply on client with board which we found by id or send error code 400 if we not found board.
 */

async function getBoardById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { boardId } = <RequestParamsDefault>req.params;
  const board =  findBoardById(boardId);

  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new board from body data and add this board in boards array, we send new board on client.
 */

async function createBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const body = <IBoards>req.body
  const board = { ...body, id: uuid.v4() };
  addBoard(board);

  reply.code(201).send(board);
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success updated board from body data we send board on client, or send error with status code 400 if board not found in boards array.
 */

async function updateBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { boardId } = <RequestParamsDefault>req.params;
  const boardIndex = findBoardByIndex(boardId)
  if (boardIndex === -1) {
    reply.code(400).send('Board not found');
  } else {
    updateBoardInData(boardIndex, req);
    reply.send(boardsData[boardIndex]);
  }
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success deleted board from boards array we deleted all tasks which boardId and send message on client that the board has been deleted.
 * If we not found boards we send error with status code 404.
 */

async function deleteBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
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

