import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/task.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  // Enable global validation
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip non-whitelisted properties
      forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
    }),
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests only from Vue app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
