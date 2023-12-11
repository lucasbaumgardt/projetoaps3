import * as dotenv from "dotenv";
import * as cors from 'cors'; 
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { GLOBAL_PIPE_OPTIONS } from "./ecommerce-aps/configs/class-validator.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); 
    } else {
        next();
    }
  });

  app.useGlobalPipes(new ValidationPipe(GLOBAL_PIPE_OPTIONS));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
