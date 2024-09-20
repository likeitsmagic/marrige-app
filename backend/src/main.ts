import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin:
      configService.get('NODE_ENV') === 'development'
        ? 'http://localhost:5173'
        : undefined,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
