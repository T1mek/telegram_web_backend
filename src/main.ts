import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as serverless from 'serverless-http';
import * as helmet from 'helmet';

async function bootstrap(module: any) {
  const app = express();
  const nestApp = await NestFactory.create<NestExpressApplication>(
    module,
    new ExpressAdapter(app),
    {
      cors: true,
    },
  );

  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   cors: true,
  // });
  nestApp.useStaticAssets(join(__dirname, '..', 'assets'));

  nestApp.setGlobalPrefix('/.netlify/functions/server');
  nestApp.enableCors();
  nestApp.use(helmet);
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  nestApp.use(express.json({ limit: '50mb' }));
  nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));

  await nestApp.init();
  return app;
}
let cachedHandler: any;
const proxyApi = async (module: any, event: any, context: any) => {
  if (!cachedHandler) {
    const app = await bootstrap(module);
    cachedHandler = serverless(app);
  }

  return cachedHandler(event, context);
};

export const handler = async (event: any, context: any) =>
  proxyApi(AppModule, event, context);
