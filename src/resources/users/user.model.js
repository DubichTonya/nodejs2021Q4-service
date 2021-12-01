const getUsersOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply) {
    reply.send([]);
  }
};
const getUserOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply) {
    reply.send([]);
  }
};
const postUserOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'key' ],
      properties: {
        key: { type: 'string' }
      }
    },
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply) {
    reply.send([]);
  }
};
const putUserOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'key' ],
      properties: {
        key: { type: 'string' }
      }
    },
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply) {
    reply.send('some text');
  }
};
const deleteUserOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply) {
    reply.send([]);
  }
};

module.exports = {
  getUsersOpt, getUserOpt, deleteUserOpt, postUserOpt, putUserOpt
};
