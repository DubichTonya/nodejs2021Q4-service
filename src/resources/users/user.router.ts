import { FastifyInstance } from 'fastify';

const { getUsersOpt, getUserOpt, deleteUserOpt, postUserOpt, putUserOpt } = require('./user.model.ts');

/**
 * Connecting user routes
 * @param fastify - fastify instance
 * @param options - boolean value true if we have options
 * @param done - callback which nothing return and call after connecting routers
 * @return returns nothing only connecting routers inside function
 */

function userRoutes(fastify: FastifyInstance, options: boolean, done: () => void): void {

  fastify.get('/users', getUsersOpt);

  fastify.get('/users/:userId', getUserOpt);

  fastify.post('/users', postUserOpt);

  fastify.put('/users/:userId', putUserOpt);

  fastify.delete('/users/:userId', deleteUserOpt);

  done();

}

module.exports = { userRoutes };
