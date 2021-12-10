import { FastifyRequest } from 'fastify';

export {}
interface column {
  title: string, order: number
}

interface IBoards {
  id?: string;
  title: string;
  columns: column[]
}

const boardData: IBoards[] = [];

/**
 * Returns all boards
 * @returns array with boards objects
 */

function getBoardData(): IBoards[] {
  return boardData;
}

/**
 * Returns noting. Adding board in array of boards
 * @param board - board object
 */

function addBoard(board: IBoards): void {
  boardData.push(board);
}

/**
 * Returns noting. Deleting board from array of boards
 * @param boardIndex - index of board (number)
 */

function deleteBoardFromData(boardIndex: number): void {
  boardData.splice(boardIndex, 1);
}

/**
 * Returns noting. Updating board from array of boards
 * @param boardIndex - index of board (number)
 * @param req - request from server (FastifyRequest)
 */

function updateBoardInData(boardIndex: number, req: FastifyRequest): void {
  const body = <IBoards>req.body;
  boardData[boardIndex] = { ...boardData[boardIndex], ...body };
}

/**
 * Search board by id in array of boards
 * @param boardId - id of board (string)
 * @returns return board object or undefined if not found board
 */

function findBoardById(boardId: string): IBoards | undefined {
  return boardData.find(item => item.id === boardId);
}

/**
 * Search board index by id in array of boards
 * @param boardId - id of board (string)
 * @returns return board index (number) or -1 if not found board
 */

function findBoardByIndex(boardId: string): number {
  return boardData.findIndex(item => item.id === boardId);
}

module.exports = {
  getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex
}
