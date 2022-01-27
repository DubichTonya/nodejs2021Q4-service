import { authorization } from './auth.service';

const postAuthOpt = {
  schema: {
    body: {
      type: 'object',
      required: [ 'login', 'password' ],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          token: { type: 'string' }
        }
      }
    }
  },
  handler: authorization
};

export {postAuthOpt}