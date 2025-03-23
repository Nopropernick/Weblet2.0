import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend connections
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  // Enable WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3001);
  console.log('Backend is running on http://localhost:3001');
}

bootstrap();
