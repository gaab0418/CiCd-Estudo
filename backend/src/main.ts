import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS liberado só pra estudo. Em produção real, restrinja a origin.
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`[backend] rodando na porta ${port} | ambiente: ${process.env.APP_ENV ?? 'não definido'}`);
}
bootstrap();
