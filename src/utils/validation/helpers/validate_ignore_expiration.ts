import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isBoolean } from '../validators_predicates.js';

export function validateIgnoreExpiration(options: VerifyOptions): VerifyOptions {
  if ('ignoreExpiration' in options) {
    if (!isBoolean(options.ignoreExpiration)) {
      throw createSjwtValidationError(
        'VerifyOptions.ignoreExpiration must be a boolean',
      );
    }
  }

  return options;
}

export default validateIgnoreExpiration;

