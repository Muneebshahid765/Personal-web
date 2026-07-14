import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './backend/src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Set global API prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS for frontend compatibility
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : (isProduction ? 3000 : 3001);

  // Serve static assets in production
  if (isProduction) {
    const distPath = path.join(process.cwd(), 'dist');
    app.useStaticAssets(distPath);
    
    const expressInstance = app.getHttpAdapter().getInstance();
    expressInstance.get('*', (req: any, res: any, next: any) => {
      // Allow API endpoints to pass through to NestJS routes
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  console.log(`🚀 Unified Portfolio Server starting in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode on port ${port}...`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
