import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, USE_FASTIFY } from './common/config';
import { AuthGuard } from './guards/auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, USE_FASTIFY());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());
  await app.listen(PORT);
}
bootstrap();
