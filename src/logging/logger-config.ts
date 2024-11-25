import { LogLevel } from '@nestjs/common';
export function getActiveLogLevels(): LogLevel[] {
  const logLevel = Number(process.env.LOG_LEVEL || 2);
  console.log(logLevel);
  const levels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
  console.log(levels.slice(0, logLevel + 1));
  return levels.slice(0, logLevel + 1) as LogLevel[];
}
