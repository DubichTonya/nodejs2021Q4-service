const {getTasksOpt, getTaskOpt, deleteTaskOpt, postTaskOpt, putTaskOpt} = require('./task.models')

function taskRoutes(fastify, options, done) {

  fastify.get('/boards/:boardId/tasks', getTasksOpt)

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpt)

  fastify.post('/boards/:boardId/tasks/:taskId', postTaskOpt)

  fastify.put('/boards/:boardId/tasks/:taskId', putTaskOpt)

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpt)

  done()

}

module.exports = { taskRoutes };
