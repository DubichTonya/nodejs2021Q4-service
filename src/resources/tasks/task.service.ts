import { getRepository } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { connection } from '../../db';
import { TaskEntity } from '../../entities/Task';
import { BoardEntity } from '../../entities/Board';
import { UserEntity } from '../../entities/User';
import { ColumnEntity } from '../../entities/Column';


interface RequestParamsDefault {
  boardId: string;
  taskId: string;
}

interface RequestBodyDefault {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

/**
 * Router function which send all tasks on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply with tasks array on client
 */

async function getAllTasks(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  await connection
    .then(async () => {
      const tasks = await getRepository(TaskEntity).find();
      reply.send(tasks);
    })
    .catch(() => {
      reply.code(404).send('Not found');
    });
}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply on client with task which we found by id or send
 *     error code 400 if we not found task.
 */

async function getTaskById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { taskId } = <RequestParamsDefault>req.params;

  await connection
    .then(async () => {
      const task = await getRepository(TaskEntity).findOne(taskId);
      if (!task) {
        reply.code(404).send(`task not found`);
      } else {
        reply.code(200).send(task);
      }

    })
    .catch(() => {
      reply.code(404).send('Not found');
    });
}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new task from body data and add this task in tasks
 *     array, we send new task on client.
 */

async function createTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { boardId } = <RequestParamsDefault>req.params;
  const {title, order, description, userId, columnId} = <RequestBodyDefault>req.body;
  await connection
    .then(async () => {
      const task = await getRepository(TaskEntity).create({
        title, order, description, userId, columnId, boardId
      });
      
      if (boardId) {
        const board = await getRepository(BoardEntity).findOne(boardId);
        task.board = board;
      }

      if (userId) {
        const user = await getRepository(UserEntity).findOne(userId);
        task.user = user;
      }

      if (columnId) {
        const column = await getRepository(ColumnEntity).findOne(columnId);
        task.column = column;
      }

      await getRepository(TaskEntity).save(task);
      reply.code(201).send(task);
    })
    .catch((err) => {
      reply.code(401).send(err.message);
    });
}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success updated task from body data we send task on client, or send
 *     error with status code 400 if task not found in tasks array.
 */

async function updateTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { taskId } = <RequestParamsDefault>req.params;
  const body = <RequestBodyDefault>req.body;
  let task: TaskEntity;
  await connection
    .then(async () => {
      task = getRepository(TaskEntity).create({
        id: taskId,
        ...body
      });

      if (body.boardId) {
        const board = await getRepository(BoardEntity).findOne(body.boardId);
        task.board = board;
      }

      if (body.userId) {
        const user = await getRepository(UserEntity).findOne(body.userId);
        task.user = user;
      }

      if (body.columnId) {
        const column = await getRepository(ColumnEntity).findOne(body.columnId);
        task.column = column;
      }

      await getRepository(TaskEntity).save(task);
      reply.send(task);
    })
    .catch(() => {
      reply.code(401).send('Board not found');
    });
}

/**
 * Router function which send task by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success deleted task from tasks array we send message on client that
 *     the task has been deleted. If we not found tasks we send error with status code 404.
 */

async function deleteTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { taskId } = <RequestParamsDefault>req.params;

  await connection
    .then(async () => {
      await getRepository(TaskEntity).delete(taskId);
      reply.send('Task deleted');
    })
    .catch(() => {
      reply.code(404).send('Task not found');
    });
}

export {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask
};
