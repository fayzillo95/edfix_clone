import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initGlobalApp, logMemoryUsage } from './core/use_initilation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initGlobalApp(app)
  await app.listen(process.env.PORT ?? 15975);
  console.log(process.env.APP_BASE_URL + "/api-docs")
  console.log("Action test")
}
bootstrap();
try {
  // Initial memory check
  logMemoryUsage('Bootstrap Start');
  // Database migration with memory monitoring
  console.log('📦 Running database migrations...');
  const { execSync } = require('child_process');

  logMemoryUsage('Before Migration');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  logMemoryUsage('After Migration');

  // Application startup
  console.log('🎯 Starting application...');
  logMemoryUsage('Before App Start');

  // Your app initialization code here
  // await startApplication();

  logMemoryUsage('Application Started');

  // Set up periodic memory monitoring (har 30 soniyada)
  setInterval(() => {
    logMemoryUsage('Periodic Check');
  }, 30000);

  console.log('✅ Bootstrap completed successfully!');
} catch (error) {
  console.log(error)
}