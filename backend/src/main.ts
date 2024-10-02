import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://moyasvadba.space', 'http://localhost:5173'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
