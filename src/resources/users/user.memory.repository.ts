import { FastifyRequest } from 'fastify';

interface IUser {
  name?: string;
  login?: string;
  password?: string;
  id?: string;
}

const userData: IUser[] = [];

/**
 * Returns all users
 * @returns array with users or empty array
 */

function getUserData(): IUser[] {
  return userData;
}

/**
 * Adds user in array of users
 * @param user - user object
 * @returns Returns noting. Adds user in users array
 */

function addUser(user: IUser): void {
  userData.push(user);
}

/**
 * Deletes user from array of users
 * @param userIndex - index of user (number)
 * @returns Returns noting. Finds user by index in users and delete it
 */

function deleteUserFromData(userIndex: number): void {
  userData.splice(userIndex, 1);
}

/**
 * Updates user in array of users
 * @param userIndex - index of user (number)
 * @param req - request from server (FastifyRequest)
 * @returns Returns noting. Changing user object from data which take in request body
 */

function updateUserInData(userIndex: number, req: FastifyRequest) {
  const body = <IUser>req.body;
  userData[userIndex] = { ...userData[userIndex], ...body };
}

/**
 * Searching user by id in array of users
 * @param userId - id of user (string)
 * @returns Searching user by id in array and return user or undefined if not found
 */

function findUserById(userId: string): IUser | unknown {
  return userData.find(item => item.id === userId);
}

/**
 * Searching user index by id in array of users
 * @param userId - id of user (string)
 * @returns Searching user in array and return user index or -1 if not found
 */

function findUserByIndex(userId: string): number {
  return userData.findIndex(item => item.id === userId);
}

export {
  getUserData, addUser, deleteUserFromData, updateUserInData, findUserById, findUserByIndex
};
