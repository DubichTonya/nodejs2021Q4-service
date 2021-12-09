import { FastifyInstance } from 'fastify';

const { getUsersOpt, getUserOpt, deleteUserOpt, postUserOpt, putUserOpt } = require('./user.model.ts');

function userRoutes(fastify: FastifyInstance, options: boolean, done: () => void) {

  fastify.get('/users', getUsersOpt);

  fastify.get('/users/:userId', getUserOpt);

  fastify.post('/users', postUserOpt);

  fastify.put('/users/:userId', putUserOpt);

  fastify.delete('/users/:userId', deleteUserOpt);

  done();

}

module.exports = { userRoutes };
