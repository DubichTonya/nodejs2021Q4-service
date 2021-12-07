export {}
const {getBoardsOpt, getBoardOpt, deleteBoardOpt, postBoardOpt, putBoardOpt} = require('./board.models')

function boardRoutes(fastify, options, done) {

  fastify.get('/boards', getBoardsOpt)

  fastify.get('/boards/:boardId', getBoardOpt)

  fastify.post('/boards', postBoardOpt)

  fastify.put('/boards/:boardId', putBoardOpt)

  fastify.delete('/boards/:boardId', deleteBoardOpt)

  done()

}

module.exports = { boardRoutes };
