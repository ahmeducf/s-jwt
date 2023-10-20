import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isString } from '../validators_predicates.js';

export function validateJwtId(options: VerifyOptions): VerifyOptions {
  if ('jwtId' in options) {
    if (!isString(options.jwtId)) {
      throw createSjwtValidationError('VerifyOptions.jwtId must be a string');
    }
  }

  return options;
}

export default validateJwtId;
