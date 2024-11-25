import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { getActiveLogLevels } from './logger-config';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly activeLevels: LogLevel[] = getActiveLogLevels();
  private readonly logFilePath = path.join(
    __dirname,
    '..',
    '..',
    'logging',
    'app.log',
  );
  private readonly errorFilePath = path.join(
    __dirname,
    '..',
    '..',
    'logging',
    'error.log',
  );
  private shouldLog(level: LogLevel): boolean {
    return this.activeLevels.includes(level);
  }
  log(message: string) {
    if (this.shouldLog('log')) {
      super.log(message);
      fs.appendFileSync(
        this.logFilePath,
        `${new Date().toISOString()} - LOG: ${message}\n`,
      );
    }
  }
  warn(message: string) {
    if (this.shouldLog('warn')) {
      super.warn(message);
      fs.appendFileSync(
        this.logFilePath,
        `${new Date().toISOString()} - WARN: ${message}\n`,
      );
    }
  }
  debug(message: string) {
    if (this.shouldLog('debug')) {
      super.debug(message);
      fs.appendFileSync(
        this.logFilePath,
        `${new Date().toISOString()} - DEBUG: ${message}\n`,
      );
    }
  }
  verbose(message: string) {
    if (this.shouldLog('verbose')) {
      super.verbose(message);
      fs.appendFileSync(
        this.logFilePath,
        `${new Date().toISOString()} - VERBOSE: ${message}\n`,
      );
    }
  }

  error(message: string) {
    if (this.shouldLog('error')) {
      super.error(message);
      fs.appendFileSync(
        this.errorFilePath,
        `${new Date().toISOString()} - ERROR: ${message}\n`,
      );
    }
  }
}
