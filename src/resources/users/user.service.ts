import { getRepository } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserEntity } from '../../entities/User';
import { connection } from '../../db';

interface RequestParamsDefault {
  userId: string;
}

interface RequestBodyDefault {
  name: string;
  login: string;
  password: string;
}

/**
 * Router function which send all users on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply with users array on client
 */

async function getAllUsers(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  await connection
    .then(async () => {
      const users = await getRepository(UserEntity).find();
      reply.send(users);
    })
    .catch((err) => {
      reply.code(500).send(err.message);
    });

}

/**
 * Router function which send user by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After server send reply on client with user which we found by id or send
 *     error code 400 if we not found user.
 */

async function getUserById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { userId } = <RequestParamsDefault>req.params;

  await connection
    .then(async () => {
      const user = await getRepository(UserEntity).findOne(userId);
      if (!user) {
        reply.code(400).send(`User not found`);
      } else {
        reply.send(user);
      }
    })
    .catch(() => {
      reply.code(400).send('User not found');
    });
}

/**
 * Router function which send user by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new user from body data and add this user in users
 *     array, we send new user on client.
 */

async function createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { name, login, password } = <RequestBodyDefault>req.body;

  await connection
    .then(async () => {
      const user = await getRepository(UserEntity).create({
        name,
        login,
        password
      });

      await getRepository(UserEntity).save(user);
      reply.code(201).send(user);
    })
    .catch((err) => {
      reply.code(500).send(err.message);
    });
}

/**
 * Router function which send user by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success updated user from body data we send user on client, or send
 *     error with status code 400 if user not found in users array.
 */


async function updateUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { userId } = <RequestParamsDefault>req.params;
  const body = <RequestBodyDefault>req.body;

  await connection
    .then(async () => {
      const user = await getRepository(UserEntity).create({
        id: userId,
        ...body
      });

      await getRepository(UserEntity).save(user);
      reply.send(user)
    })
    .catch(() => {
      reply.code(400).send('User not found');
    });
}

/**
 * Router function which send user by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success deleted user from users array we change userId in tasks on null
 *     and send message on client that the user has been deleted. If we not found users we send error with status code
 *     401.
 */

async function deleteUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { userId } = <RequestParamsDefault>req.params;

  await connection
    .then(async () => {
      await getRepository(UserEntity).delete(userId);
      reply.send('User deleted');
    })
    .catch(() => {
      reply.code(401).send('User not found');
    });
}

export {
  getAllUsers, getUserById, createUser, updateUser, deleteUser
};
