import { Logger } from '@dollarsign/logger';
import { GlobalExceptionFilter } from '@dollarsign/nestjs-exceptions';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from './configs/app.config';
import { AppModule } from './modules/app/app.module';
import { validationPipeOptions } from './pipes/validation-pipe-options';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, isProduction } = configService.get<AppConfig>('app');

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (!isProduction) {
    const options = new DocumentBuilder().setTitle('basic').setDescription('Basic nestjs application').setVersion(null).build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(port);
  const url = await app.getUrl();
  logger.verbose(`Nest application is listening on ${url}`);
}
(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  logger.error(`Nest application error: ${error.message}`);
});
