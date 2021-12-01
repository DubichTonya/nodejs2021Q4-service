const getBoardsOpt = {
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
    reply.send([])
  }
}
const getBoardOpt = {
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
    reply.send([])
  }
}
const postBoardOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['key'],
      properties: {
        key: {type: 'string'}
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
    reply.send([])
  }
}
const putBoardOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['key'],
      properties: {
        key: {type: 'string'}
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
    reply.send([])
  }
}
const deleteBoardOpt = {
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
    reply.send([])
  }
}

module.exports = {
  getBoardsOpt, getBoardOpt, deleteBoardOpt, postBoardOpt, putBoardOpt
}
