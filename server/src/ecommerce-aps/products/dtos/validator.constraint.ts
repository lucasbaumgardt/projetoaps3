import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isBuffer', async: false })
export class IsBufferConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value instanceof Buffer) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid buffer data. Must be a Buffer.';
  }
}
