import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || 3001;
  const app = await NestFactory.create(AppModule);
  
  // Set global API routing prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS so the React frontend can fetch securely
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  console.log(`📡 NestJS secure API backend bootstrapping on port ${port}...`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
