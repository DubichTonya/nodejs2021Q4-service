import { Connection, getRepository } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { connection } from '../../db';
import { BoardEntity } from '../../entities/Board';
import { ColumnEntity } from '../../entities/Column';


interface IColumn {
    title: string,
    order: number
}

interface IBoards {
    id?: string;
    title: string;
    columns: ColumnEntity[];
}

interface RequestParamsDefault {
    boardId: string;
}

/**
 * Router function which send all boards on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply with boards array on client
 */

async function getAllBoards(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    await connection
      .then(async () => {
          const boards = await getRepository(BoardEntity).find({relations: ["columns"]});
          reply.send(boards);
      })
      .catch((err) => {
          reply.code(500).send(err.message)
      })

}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply on client with board which we found by id or send
 *     error code 400 if we not found board.
 */

async function getBoardById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId } = <RequestParamsDefault>req.params;
    
    await connection
      .then(async () => {
        const board = await getRepository(BoardEntity).findOne(boardId, {relations: ["columns"]});
        
        if(board){
          reply.send(board);
        } else {
          reply.code(400).send('Board not found');
        }
    
      })
      .catch(() => {
        reply.code(400).send('Board not found');
      })
    
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new board from body data and add this board in boards
 *     array, we send new board on client.
 */

async function createColumn(item: IColumn, c: Connection, board: BoardEntity){
    const column = await getRepository(ColumnEntity).create({
        title: item.title,
        order: item.order,
        board
    });
    await c.manager.save(column);
}

async function createBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const {title, columns} = <IBoards>req.body;
    let board: BoardEntity;
    await connection
      .then(async (c) => {
          board = new BoardEntity();
          board.title = title;
          board.columns = columns;
          await c.manager.save(board);

          columns?.forEach((item) => {
              createColumn(item, c, board)
          })

          reply.code(201).send(board)

      })
      .catch((error) => {
          reply.code(500).send(error.message)
      })
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success updated board from body data we send board on client, or send
 *     error with status code 400 if board not found in boards array.
 */

async function updateBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { boardId } = <RequestParamsDefault>req.params;
  const body = <IBoards>req.body;

  await connection
    .then(async (c) => {
      await c.manager.update(BoardEntity, boardId, { title: body.title });
      const board = await getRepository(BoardEntity).findOne(boardId, {relations: ["columns"]});
      reply.send(board);
    })
    .catch(() => {
      reply.code(404).send('Board not found');
    })
}

/**
 * Router function which send board by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success deleted board from boards array we deleted all tasks which
 *     boardId and send message on client that the board has been deleted. If we not found boards we send error with
 *     status code 404.
 */

async function deleteBoard(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { boardId } = <RequestParamsDefault>req.params;
    
    await connection
      .then(async () => {
        await getRepository(BoardEntity).delete(boardId);
        reply.send('Board deleted');
      })
      .catch(() => {
        reply.code(400).send('Board not found');
      })
}

export {
    getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard
};

