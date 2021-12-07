const userData = [];

function getUserData() {
  return userData;
}

function addUser(user) {
  userData.push(user)
}

function deleteUserFromData(userIndex) {
  userData.splice(userIndex, 1);
}

function updateUserInData(userIndex, req) {
  userData[userIndex] = { ...userData[userIndex], ...req.body };
}


function findUserById(userId) {
  return userData.find(item => item.id === userId);
}

function findUserByIndex(userId) {
  return userData.findIndex(item => item.id === userId);
}

module.exports = {
  getUserData, addUser, deleteUserFromData, updateUserInData, findUserById, findUserByIndex
}
