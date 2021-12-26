import { FastifyReply, FastifyRequest } from 'fastify';
import * as uuid from 'uuid';

export function createResponseMessage(req: FastifyRequest, reply: FastifyReply): string {
  return `
  id: ${uuid.v4()}
  url: ${req.url}, query parameters: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}, status code: ${reply.statusCode}
  `;
}

export function createErrorMessage(err: Error): string {
  return `
  id: ${uuid.v4()}
  name: ${err.name}, message: ${err.message}, 
  stack: ${err.stack}
  `;
}

export function createPromiseErrorMessage(reason:unknown, promise:Promise<unknown>): string {
  return `
  id: ${uuid.v4()}
  'Unhandled Rejection at: ${JSON.stringify(promise)}, reason: ${reason}, 
  `;
}