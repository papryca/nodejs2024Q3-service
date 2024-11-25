import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { CustomExceptionFilter } from './logging/exception-filter';
import { getActiveLogLevels } from './logging/logger-config';

async function bootstrap() {
  const activeLevels = getActiveLogLevels();
  const app = await NestFactory.create(AppModule, {
    logger: activeLevels,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter(app.get(LoggingService)));
  app.useLogger(app.get(LoggingService));

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
