import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from './common/logger';

@Catch(HttpException)
export class HttpExceptionFilter extends Logger implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = `url: ${request.url}, query parameters: ${JSON.stringify(
      request.query,
    )}, body: ${JSON.stringify(request.body)}, statusCode: ${status}`;

    this.error(message);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
