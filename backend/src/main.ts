import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // payload validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Brain Aging Program Data')
    .setDescription('The Brain Data API description')
    .setVersion('1.0')
    .addTag('brainData')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
