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

function getBoardData(): IBoards[] {
  return boardData;
}

function addBoard(board: IBoards): void {
  boardData.push(board)
}

function deleteBoardFromData(boardIndex: number): void {
  boardData.splice(boardIndex, 1);
}

function updateBoardInData(boardIndex: number, req: FastifyRequest) {
  const body = <IBoards>req.body;
  boardData[boardIndex] = { ...boardData[boardIndex], ...body };
}


function findBoardById(boardId: string) {
  return boardData.find(item => item.id === boardId);
}

function findBoardByIndex(boardId: string) {
  return boardData.findIndex(item => item.id === boardId);
}

module.exports = {
  getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex
}
