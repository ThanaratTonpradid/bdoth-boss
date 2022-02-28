import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
  validationError: { target: false },
};

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  ...validatorOptions,
  exceptionFactory: validationErrors => {
    return new BadRequestException(validationErrors);
  },
};
