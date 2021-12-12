import * as uuid from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
    getUserData,
    addUser,
    deleteUserFromData,
    updateUserInData,
    findUserById,
    findUserByIndex
} from './user.memory.repository';
import { changeUserIdInTasks } from '../tasks/task.memory.repository';

const usersData = getUserData();

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
    reply.send(usersData);
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
    const user = findUserById(userId);

    if (!user) {
        reply.code(400).send('User not found');
    } else {
        reply.send(user);
    }
}

/**
 * Router function which send user by id on client
 * @param req - request from server
 * @param reply - reply from server
 * @return promise which nothing returns. After success create a new user from body data and add this user in users
 *     array, we send new user on client.
 */

async function createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = <RequestBodyDefault>req.body;
    const user = { ...body, id: uuid.v4() };
    addUser(user);
    reply.code(201).send(user);
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
    const userIndex = findUserByIndex(userId);
    if (userIndex === -1) {
        reply.code(400).send('User not found');
    } else {
        updateUserInData(userIndex, req);
        reply.send(usersData[userIndex]);
    }
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
    const userIndex = findUserByIndex(userId);
    if (userIndex === -1) {
        reply.code(401).send('User not found');
    } else {
        deleteUserFromData(userIndex);
        changeUserIdInTasks(userId);
        reply.send('User deleted');
    }
}

export {
    getAllUsers, getUserById, createUser, updateUser, deleteUser
};
