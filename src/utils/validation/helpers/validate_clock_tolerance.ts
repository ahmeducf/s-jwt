import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isValidSecondsNumber } from '../validators_predicates.js';

export function validateClockTolerance(options: VerifyOptions): VerifyOptions {
  if ('clockTolerance' in options) {
    if (!isValidSecondsNumber(options.clockTolerance)) {
      throw createSjwtValidationError(
        'VerifyOptions.clockTolerance must be a positive integer representing seconds',
      );
    }
  }

  return options;
}

export default validateClockTolerance;
