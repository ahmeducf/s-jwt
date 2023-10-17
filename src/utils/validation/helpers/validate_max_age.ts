import ms from 'ms';
import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isValidSecondsNumberOrTimespanString } from '../validators_predicates.js';

export function validateMaxAge(options: VerifyOptions): VerifyOptions {
  const newOptions: VerifyOptions = options;
  if ('maxAge' in newOptions) {
    if (!isValidSecondsNumberOrTimespanString(newOptions.maxAge)) {
      throw createSjwtValidationError(
        'VerifyOptions.maxAge must be a positive integer representing seconds or a timespan string',
      );
    }

    if (typeof newOptions.maxAge === 'string') {
      newOptions.maxAge = ms(newOptions.maxAge) / 1000;
    }
  }

  return newOptions;
}

export default validateMaxAge;
