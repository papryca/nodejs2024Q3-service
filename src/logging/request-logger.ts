import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    const requestLog = `Request: [${method}] ${originalUrl}, Query: ${JSON.stringify(
      query,
    )}, Body: ${JSON.stringify(body)}`;

    res.on('finish', () => {
      const responseLog = `Response: ${res.statusCode}`;
      this.loggingService.log(`${requestLog} - ${responseLog}`);
    });

    next();
  }
}
