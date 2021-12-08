import { FastifyInstance } from 'fastify';

export {}
const {getTasksOpt, getTaskOpt, deleteTaskOpt, postTaskOpt, putTaskOpt} = require('./task.models.ts')

function taskRoutes(fastify: FastifyInstance, options:any, done: () => void) {

  fastify.get('/boards/:boardId/tasks', getTasksOpt)

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpt)

  fastify.post('/boards/:boardId/tasks', postTaskOpt)

  fastify.put('/boards/:boardId/tasks/:taskId', putTaskOpt)

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpt)

  done()

}

module.exports = { taskRoutes };
