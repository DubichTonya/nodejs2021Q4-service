export {}

const { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } = require('./board.service.ts');


const boardObjectProperties = {
  id: { type: 'string' },
  title: { type: 'string' },
  columns: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' }
      }
    }
  }
};

const board = {
  type: 'object',
  properties: boardObjectProperties
};

const getBoardsOpt = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: board
      }
    }
  },
  handler: getAllBoards
};
const getBoardOpt = {
  schema: {
    response: {
      200: board
    }
  },
  handler: getBoardById
};
const postBoardOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'title', 'columns' ],
      properties: boardObjectProperties
    },
    response: {
      201: board
    }
  },
  handler: createBoard
};
const putBoardOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'title', 'columns' ],
      properties: boardObjectProperties
    },
    response: {
      200: board
    }
  },
  handler: updateBoard
};
const deleteBoardOpt = {
  schema: {
    response: {
      204: {
        items: {
          type: 'string'
        }
      }
    }
  },
  handler: deleteBoard
};

module.exports = {
  getBoardsOpt, getBoardOpt, deleteBoardOpt, postBoardOpt, putBoardOpt
};
