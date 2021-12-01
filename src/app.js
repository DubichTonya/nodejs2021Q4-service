const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
const { userRoutes } = require('./resources/users/user.router');
const { boardRoutes } = require('./resources/boards/board.router');
const { taskRoutes } = require('./resources/tasks/task.router');


fastify.register(require('fastify-swagger'), );
// Declare a route
fastify.register(userRoutes);
fastify.register(boardRoutes);
fastify.register(taskRoutes);

// Run the server!
const server = async () => {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = server;
