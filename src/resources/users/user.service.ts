import { FastifyReply, FastifyRequest } from 'fastify';

const uuid = require('uuid');
const { getUserData, addUser, deleteUserFromData, updateUserInData, findUserById, findUserByIndex } = require('./user.memory.repository.ts');
const { changeUserIdInTasks } = require('../tasks/task.memory.repository.ts');

const usersData = getUserData();

async function getAllUsers(req:FastifyRequest, reply: FastifyReply) {
  reply.send(usersData);
}


interface RequestParamsDefault {
  userId: string;
}

interface RequestBodyDefault {
  name: string;
  login: string;
  password: string;
}

async function getUserById(req:FastifyRequest, reply: FastifyReply) {
  const { userId } = <RequestParamsDefault>req.params;
  const user = findUserById(userId)

  if (!user) {
    reply.code(400).send('User not found');
  } else {
    reply.send(user);
  }
}

async function createUser(req:FastifyRequest, reply: FastifyReply) {
  const body = <RequestBodyDefault>req.body;
  const user = { ...body, id: uuid.v4() };
  addUser(user)
  reply.code(201).send(user);
}

async function updateUser(req:FastifyRequest, reply: FastifyReply) {
  const { userId } = <RequestParamsDefault>req.params;
  const userIndex = findUserByIndex(userId);
  if (userIndex === -1) {
    reply.code(400).send('User not found');
  } else {
    updateUserInData(userIndex, req)
    reply.send(usersData[userIndex]);
  }
}

async function deleteUser(req:FastifyRequest, reply: FastifyReply) {
  const { userId } = <RequestParamsDefault>req.params;
  const userIndex = findUserByIndex(userId)
  if (userIndex === -1) {
    reply.code(401).send('User not found');
  } else {
    deleteUserFromData(userIndex)
    changeUserIdInTasks(userId)
    reply.send('User deleted');
  }
}

module.exports = {
  usersData, getAllUsers, getUserById, createUser, updateUser, deleteUser
};
