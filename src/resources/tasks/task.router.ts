import { FastifyInstance } from 'fastify';

export {};
const { getTasksOpt, getTaskOpt, deleteTaskOpt, postTaskOpt, putTaskOpt } = require('./task.models.ts');

/**
 * Connecting user routes
 * @param fastify - fastify instance
 * @param options - boolean value true if we have options
 * @param done - callback which nothing return and call after connecting routers
 * @return returns nothing only connecting routers inside function
 */

function taskRoutes(fastify: FastifyInstance, options: boolean, done: () => void): void {

    fastify.get('/boards/:boardId/tasks', getTasksOpt);

    fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpt);

    fastify.post('/boards/:boardId/tasks', postTaskOpt);

    fastify.put('/boards/:boardId/tasks/:taskId', putTaskOpt);

    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpt);

    done();

}

module.exports = { taskRoutes };
