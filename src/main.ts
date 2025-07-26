import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initGlobalApp } from './core/use_initilation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initGlobalApp(app)
  await app.listen(process.env.PORT ?? 15975);
  console.log("http://localhost:15975/api-docs")
}
bootstrap();
