import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { postAuthOpt } from './auth.model';

/**
 * Connecting user routes
 * @param fastify - fastify instance
 * @param options - boolean value true if we have options
 * @param done - callback which nothing return and call after connecting routers
 * @return returns nothing only connecting routers inside function
 */

function authRoutes(fastify: FastifyInstance, options: FastifyRegisterOptions<boolean>, done: () => void): void {
  fastify.post('/login', postAuthOpt);
  done();
}

export { authRoutes };