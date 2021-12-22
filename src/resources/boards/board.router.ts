import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { getBoardsOpt, getBoardOpt, deleteBoardOpt, postBoardOpt, putBoardOpt } from './board.models';

/**
 * Connecting board routes
 * @param fastify - fastify instance
 * @param options - boolean value true if we have options
 * @param done - callback which nothing return and call after connecting routers
 * @return returns nothing only connecting routers inside function
 */

function boardRoutes(fastify: FastifyInstance, options: FastifyRegisterOptions<boolean>, done: () => void) {

    fastify.get('/boards', getBoardsOpt);

    fastify.get('/boards/:boardId', getBoardOpt);

    fastify.post('/boards', postBoardOpt);

    fastify.put('/boards/:boardId', putBoardOpt);

    fastify.delete('/boards/:boardId', deleteBoardOpt);

    done();

}

export { boardRoutes };
