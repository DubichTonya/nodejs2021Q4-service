import { FastifyInstance } from 'fastify';

export {}

const {getBoardsOpt, getBoardOpt, deleteBoardOpt, postBoardOpt, putBoardOpt} = require('./board.models.ts')

function boardRoutes(fastify: FastifyInstance, options:any, done: () => void) {

  fastify.get('/boards', getBoardsOpt)

  fastify.get('/boards/:boardId', getBoardOpt)

  fastify.post('/boards', postBoardOpt)

  fastify.put('/boards/:boardId', putBoardOpt)

  fastify.delete('/boards/:boardId', deleteBoardOpt)

  done()

}

module.exports = { boardRoutes };
