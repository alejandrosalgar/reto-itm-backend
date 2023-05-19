import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Class validator config
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // Don't allow properties that aren't in the dto
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Config
  const config = new DocumentBuilder().setTitle('RETO ITM').build();

  const documentSwagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentSwagger);

  // Prisma Config
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
