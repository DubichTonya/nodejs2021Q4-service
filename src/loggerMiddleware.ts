import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './common/logger';
import { createResponseMessage } from './common/helper';

@Injectable()
export class LoggerMiddleware extends Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const { statusCode } = res;
      const firstNumberOfStatusCode = `${statusCode}`[0];
      switch (firstNumberOfStatusCode) {
        case '1':
          this.info(createResponseMessage(req, res, statusCode));
          break;
        case '2':
          this.info(createResponseMessage(req, res, statusCode));
          break;
        case '3':
          this.info(createResponseMessage(req, res, statusCode));
          break;
        case '4':
          this.error(createResponseMessage(req, res, statusCode));
          break;
        case '5':
          this.error(createResponseMessage(req, res, statusCode));
          break;
        default:
          this.info(createResponseMessage(req, res, statusCode));
          break;
      }
    });

    next();
  }
}
