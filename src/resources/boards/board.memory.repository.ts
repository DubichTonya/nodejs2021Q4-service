import { FastifyRequest } from 'fastify';

interface column {
    title: string,
    order: number
}

interface IBoards {
    id?: string;
    title: string;
    columns: column[];
}

const boardData: IBoards[] = [];

/**
 * Returns all boards
 * @returns array with boards or empty array
 */

function getBoardData(): IBoards[] {
    return boardData;
}

/**
 * Adds board in array of boards
 * @param board - board object
 * @returns Returns noting. Adds board in boards array
 */

function addBoard(board: IBoards): void {
    boardData.push(board);
}

/**
 * Deletes board from array of boards
 * @param boardIndex - index of board (number)
 * @returns Returns noting. Finds board by index in boards and delete it
 */

function deleteBoardFromData(boardIndex: number): void {
    boardData.splice(boardIndex, 1);
}

/**
 * Updates board in array of boards
 * @param boardIndex - index of board (number)
 * @param req - request from server (FastifyRequest)
 * @returns Returns noting. Changing board object from data which take in request body
 */

function updateBoardInData(boardIndex: number, req: FastifyRequest): void {
    const body = <IBoards>req.body;
    boardData[boardIndex] = { ...boardData[boardIndex], ...body };
}

/**
 * Searching board by id in array of boards
 * @param boardId - id of board (string)
 * @returns Searching board by id in array and return board or undefined if not found
 */

function findBoardById(boardId: string): IBoards | undefined {
    return boardData.find(item => item.id === boardId);
}

/**
 * Searching board index by id in array of boards
 * @param boardId - id of board (string)
 * @returns Searching board in array and return board index or -1 if not found
 */

function findBoardByIndex(boardId: string): number {
    return boardData.findIndex(item => item.id === boardId);
}

export {
    getBoardData, addBoard, deleteBoardFromData, updateBoardInData, findBoardById, findBoardByIndex
};
