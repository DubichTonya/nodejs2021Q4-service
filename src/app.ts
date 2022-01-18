import fastify from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { HOST, PORT } from './common/config';
import { Logger } from './logger';
import { createErrorMessage, createPromiseErrorMessage, createResponseMessage } from './common/helper';
import { authRoutes } from './resources/auth/auth.router';

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
Fastify.register(authRoutes);

Fastify.addHook('onResponse', (req, reply, next) => {
    const firstNumberOfStatusCode = `${reply.statusCode}`[0];
    switch (firstNumberOfStatusCode) {
        case '1':
            customLogger.info(createResponseMessage(req, reply))
            break;
        case '2':
            customLogger.info(createResponseMessage(req, reply))
            break;
        case '3':
            customLogger.info(createResponseMessage(req, reply))
            break;
        case '4':
            customLogger.error(createResponseMessage(req, reply))
            break;
        case '5':
            customLogger.error(createResponseMessage(req, reply))
            break;
        default:
            customLogger.info(createResponseMessage(req, reply))
            break;
    }
    
    next();
})

Fastify.addHook('onError', (req, reply, error, next) => {
    customLogger.error(createResponseMessage(req, reply))
    next();
})

process.on('uncaughtException', (err, origin) => {
    customLogger.error(createErrorMessage(err, origin))
    process.exit(1)
})


process.on('unhandledRejection', (reason, promise) => {
    customLogger.error(createPromiseErrorMessage(reason, promise))
});

/**
 * Start server
 * @return returns promise which nothing returns. Inside function start server and listening it, if we have error we
 *     catch it and finish process
 */

const server = async (): Promise<void> => {
    try {
        await Fastify.listen(PORT, HOST);
    } catch (err) {
        Fastify.log.error(err);
        process.exit(1);
    }
};
export { server };
