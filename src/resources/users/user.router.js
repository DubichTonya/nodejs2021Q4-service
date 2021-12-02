const { getUsersOpt, getUserOpt, deleteUserOpt, postUserOpt, putUserOpt } = require('./user.model');

function userRoutes(fastify, options, done) {

  fastify.get('/users', getUsersOpt);

  fastify.get('/users/:userId', getUserOpt);

  fastify.post('/users', postUserOpt);

  fastify.put('/users/:userId', putUserOpt);

  fastify.delete('/users/:userId', deleteUserOpt);

  done();

}

module.exports = { userRoutes };
