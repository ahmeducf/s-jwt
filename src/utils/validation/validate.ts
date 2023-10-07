import { ValidationSchema, Payload, GenerateOptions } from '../../types/index.js';
import { createSjwtValidationError } from '../error/index.js';
import { isPlainObject } from './validators_predicates.js';

export function validate(
  schema: ValidationSchema,
  allowUnknown: boolean,
  object: Payload | GenerateOptions,
  parameterName: string,
): void {
  if (!isPlainObject(object)) {
    throw createSjwtValidationError(
      `"${parameterName}" must be a plain object`,
    );
  }

  Object.keys(object).forEach((key) => {
    const validator = schema[key as keyof typeof schema];

    if (!validator) {
      if (!allowUnknown) {
        throw createSjwtValidationError(
          `"${key}" is not allowed in "${parameterName}"`,
        );
      }
      return;
    }

    if (!validator.isValid(object[key as keyof typeof object])) {
      throw createSjwtValidationError(validator.message);
    }
  });
}

export default validate;
