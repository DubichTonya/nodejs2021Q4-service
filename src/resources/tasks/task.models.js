const getTasksOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply){
    reply.send('some text')
  }
}
const getTaskOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply){
    reply.send('some text')
  }
}
const postTaskOpt = {
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
  handler(req, reply){
    reply.send('some text')
  }
}
const putTaskOpt = {
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
  handler(req, reply){
    reply.send('some text')
  }
}
const deleteTaskOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'array'
        }
      }
    }
  },
  handler(req, reply){
    reply.send('some text')
  }
}

module.exports = {
  getTasksOpt, getTaskOpt, deleteTaskOpt, postTaskOpt, putTaskOpt
}
