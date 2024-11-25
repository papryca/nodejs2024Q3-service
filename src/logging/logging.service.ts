import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger {
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

  log(message: string) {
    super.log(message);
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - LOG: ${message}\n`,
    );
  }

  error(message: string) {
    super.error(message);
    fs.appendFileSync(
      this.errorFilePath,
      `${new Date().toISOString()} - LOG: ${message}\n`,
    );
  }
}
