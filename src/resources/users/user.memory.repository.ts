import { FastifyRequest } from 'fastify';

export {}

interface IUser {
  name?: string;
  login?: string;
  password?: string;
  id?: string;
}

const userData: IUser[] = [];

function getUserData():IUser[] {
  return userData;
}

function addUser(user: IUser): void {
  userData.push(user)
}

function deleteUserFromData(userIndex: number): void {
  userData.splice(userIndex, 1);
}

function updateUserInData(userIndex: number, req: FastifyRequest) {
  const body = <IUser>req.body;
  userData[userIndex] = { ...userData[userIndex], ...body };
}


function findUserById(userId: string): IUser | unknown {
  return userData.find(item => item.id === userId);
}

function findUserByIndex(userId: string): number {
  return userData.findIndex(item => item.id === userId);
}

module.exports = {
  getUserData, addUser, deleteUserFromData, updateUserInData, findUserById, findUserByIndex
}
