const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./user.service');

const userObjectResponse = {
  id: { type: 'string' },
  name: { type: 'string' },
  login: { type: 'string' }

};

const userObjectProperties = {
  name: { type: 'string' },
  login: { type: 'string' },
  password: { type: 'string' }
};

const user = {
  type: 'object',
  properties: userObjectResponse
};

const getUsersOpt = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: user
      }
    }
  },
  handler: getAllUsers
};
const getUserOpt = {
  schema: {
    response: {
      200: user
    }
  },
  handler: getUserById
};
const postUserOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'name', 'login', 'password' ],
      properties: userObjectProperties
    },
    response: {
      201: user
    }
  },
  handler: createUser
};
const putUserOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'name', 'login', 'password' ],
      properties: userObjectProperties
    },
    response: {
      200: user
    }
  },
  handler: updateUser
};
const deleteUserOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'string'
        }
      }
    }
  },
  handler: deleteUser
};

module.exports = {
  getUsersOpt, getUserOpt, deleteUserOpt, postUserOpt, putUserOpt
};
