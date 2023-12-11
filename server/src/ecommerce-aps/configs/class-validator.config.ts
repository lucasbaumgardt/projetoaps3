import { ValidationPipeOptions } from "@nestjs/common";

export const GLOBAL_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
};
