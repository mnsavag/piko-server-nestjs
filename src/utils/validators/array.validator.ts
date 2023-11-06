import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'available length', async: false })
export class AvailableArrayLength<T> implements ValidatorConstraintInterface {
    validate(array: Array<T>, args: ValidationArguments) {
        return args.constraints.includes(array.length);
    }

  defaultMessage(args: ValidationArguments) {
    return `Available length ${args.constraints.join(' ')}`;
  }
}