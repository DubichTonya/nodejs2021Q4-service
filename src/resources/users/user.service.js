const uuid = require('uuid');
const { getUserData, addUser, deleteUserFromData, updateUserInData, findUserById, findUserByIndex } = require('./user.memory.repository');
const { changeUserIdInTasks } = require('../tasks/task.memory.repository');

const usersData = getUserData();

async function getAllUsers(req, reply) {
  reply.send(usersData);
}

async function getUserById(req, reply) {
  const { userId } = req.params;
  const user = findUserById(userId)

  if (!user) {
    reply.code(400).send('User not found');
  } else {
    reply.send(user);
  }
}

async function createUser(req, reply) {
  const user = { ...req.body, id: uuid.v4() };
  addUser(user)
  reply.code(201).send(user);
}

async function updateUser(req, reply) {
  const { userId } = req.params;
  const userIndex = findUserByIndex(userId);
  if (userIndex === -1) {
    reply.code(400).send('User not found');
  } else {
    updateUserInData(userIndex, req)
    reply.send(usersData[userIndex]);
  }
}

async function deleteUser(req, reply) {
  const { userId } = req.params;
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
