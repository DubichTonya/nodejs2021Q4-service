import { FastifyReply, FastifyRequest } from 'fastify';
import * as uuid from 'uuid';

export function createResponseMessage(req: FastifyRequest, reply: FastifyReply): string {
  
  return `id: ${uuid.v4()}
  url: ${req.url}, query parameters: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}, status code: ${reply.statusCode}
  `;
}