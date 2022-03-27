import * as uuid from 'uuid';

export function createResponseMessage(req, reply, statusCode): string {
  return `
  id: ${uuid.v4()}
  url: ${req.url}, query parameters: ${JSON.stringify(
    req.params,
  )}, body: ${JSON.stringify(req.body)}, status code: ${statusCode}
  `;
}
