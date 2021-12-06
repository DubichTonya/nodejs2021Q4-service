const uuid = require('uuid');
let { usersData } = require('./user.memory.repository');
const { changeUserIdInTasks } = require('../tasks/task.memory.repository');

async function getAllUsers(req, reply) {
  reply.send(usersData);
}

async function getUserById(req, reply) {
  const { userId } = req.params;
  const user = usersData.find(item => item.id === userId);

  if (!user) {
    reply.code(400).send('User not found');
  } else {
    reply.send(user);
  }
}

async function createUser(req, reply) {
  const user = { ...req.body, id: uuid.v4() };
  usersData = [ ...usersData, user ];

  reply.code(201).send(user);
}

async function updateUser(req, reply) {
  const { userId } = req.params;
  const userIndex = usersData.findIndex(item => item.id === userId);
  if (userIndex === -1) {
    reply.code(400).send('User not found');
  } else {
    usersData[userIndex] = { ...usersData[userIndex], ...req.body };

    reply.send(usersData[userIndex]);
  }
}

async function deleteUser(req, reply) {
  const { userId } = req.params;
  const userIndex = usersData.findIndex(item => item.id === userId);
  if (userIndex === -1) {
    reply.code(401).send('User not found');
  } else {
    usersData.splice(userIndex, 1);
    changeUserIdInTasks(userId)
    reply.send('User deleted');
  }
}

module.exports = {
  usersData, getAllUsers, getUserById, createUser, updateUser, deleteUser
};
