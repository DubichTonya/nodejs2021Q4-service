import { JWT_SECRET_KEY } from './config';

const jwt = require('jsonwebtoken');

export function checkToken(req): boolean {
  if (!(req.url === '/' || req.url === '/doc' || req.url === '/login')) {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return false;
    } else {
      const tokenArray = authorization.split(' ');
      if (
        tokenArray[0] !== 'Bearer' ||
        !jwt.verify(tokenArray[1], JWT_SECRET_KEY)
      ) {
        return false;
      }
    }
  }
}
