import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsBufferConstraint } from './validator.constraint';
export function IsBuffer(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isBuffer',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBufferConstraint,
    });
  };
}
