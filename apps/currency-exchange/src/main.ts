import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const GLOBAL_PREFFIX = 'currency-exchange';

async function bootstrap() {
  const app = await createApp();
  setupSwagger(app);
  setupServer(app);
}

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFFIX);
  return app
}

async function setupServer(app: INestApplication) {
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFFIX}`
  );
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Currency Exchange')
    .setDescription(
      'API that allows you to calculate the best conversion of the Canadian dollar to other currencies'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFFIX, app, document);
}

bootstrap();
