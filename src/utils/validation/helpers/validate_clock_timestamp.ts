import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../error/index.js';
import { isValidSecondsNumber } from '../validators_predicates.js';

export function validateClockTimestamp(options: VerifyOptions): VerifyOptions {
  const newOptions: VerifyOptions = options;
  if ('clockTimestamp' in newOptions) {
    if (!isValidSecondsNumber(newOptions.clockTimestamp)) {
      throw createSjwtValidationError(
        'VerifyOptions.clockTimestamp must be a positive integer representing seconds',
      );
    }
  } else {
    newOptions.clockTimestamp = Math.floor(Date.now() / 1000);
  }

  return newOptions;
}

export default validateClockTimestamp;
