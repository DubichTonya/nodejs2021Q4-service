import { FastifyReply, FastifyRequest } from 'fastify';
import { JWT_SECRET_KEY } from './config';

const jwt = require('jsonwebtoken');

export function checkToken(req: FastifyRequest, reply: FastifyReply): void {
  if (!(req.url === '/' || req.url === '/doc' || req.url === '/login')) {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      reply.code(401).send(new Error('Unauthorized'));
    } else {
      const tokenArray = authorization.split(' ');
      if (
        tokenArray[0] !== 'Bearer' ||
        !jwt.verify(tokenArray[1], JWT_SECRET_KEY)
      ) {
        reply.code(401).send(new Error('Unauthorized'));
      }
    }
  }
}