import fastify from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { PORT } from './common/config';
import { Logger } from './logger';
import { createResponseMessage } from './common/helper';

const customLogger = new Logger();

fastify({ logger: false });
const Fastify = fastify();

Fastify.register(fastifySwagger, {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Fastify API',
            description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
            version: '1.0.0'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
})

// Declare a route
Fastify.register(userRoutes);
Fastify.register(boardRoutes);
Fastify.register(taskRoutes);

Fastify.addHook('onResponse', (req, reply, next) => {
    customLogger.info(createResponseMessage(req, reply))
    next();
})

Fastify.addHook('onError', (req, reply, error, next) => {
    customLogger.error(createResponseMessage(req, reply))
    next()
})

/**
 * Start server
 * @return returns promise which nothing returns. Inside function start server and listening it, if we have error we
 *     catch it and finish process
 */

const server = async (): Promise<void> => {
    try {
        await Fastify.listen(PORT);
    } catch (err) {
        Fastify.log.error(err);
        process.exit(1);
    }
};

export { server };
