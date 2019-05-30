import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

const port = process.env.PORT || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', // react
    ],
  });
  await app.listen(4001);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
