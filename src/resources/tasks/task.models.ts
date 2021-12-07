export {}
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./task.service.ts');


const taskObjectProperties = {
  id: {type: 'string'},
  title: {type: 'string'},
  order: {type: 'number'},
  description: {type: 'string'},
  userId: {type: 'string', nullable: true},
  boardId: {type: 'string', nullable: true},
  columnId: {type: 'string', nullable: true},
};

const task = {
  type: 'object',
  properties: taskObjectProperties
};

const getTasksOpt = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: task
      }
    }
  },
  handler: getAllTasks
};
const getTaskOpt = {
  schema: {
    response: {
      200: task
    }
  },
  handler: getTaskById
};
const postTaskOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'title', 'order', 'description', 'userId', 'boardId'],
      properties: taskObjectProperties
    },
    response: {
      201: task
    }
  },
  handler: createTask
};
const putTaskOpt = {
  schema: {
    body: {
      type: 'object',
      properties: taskObjectProperties
    },
    response: {
      200: task
    }
  },
  handler: updateTask
};
const deleteTaskOpt = {
  schema: {
    response: {
      200: {
        items: {
          type: 'string'
        }
      }
    }
  },
  handler: deleteTask
};

module.exports = {
  getTasksOpt, getTaskOpt, deleteTaskOpt, postTaskOpt, putTaskOpt
};
