export {}
const fastify = require('fastify')({ logger: false });
const { PORT } = require('./common/config');
const { userRoutes } = require('./resources/users/user.router.ts');
const { boardRoutes } = require('./resources/boards/board.router.ts');
const { taskRoutes } = require('./resources/tasks/task.router.ts');


// Declare a route
fastify.register(userRoutes);
fastify.register(boardRoutes);
fastify.register(taskRoutes);

/**
 * Start server
 * @return returns promise which nothing returns. Inside function start server and listening it, if we have error we catch it and finish process
 */

const server = async (): Promise<void> => {
  try {
    fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = server;
