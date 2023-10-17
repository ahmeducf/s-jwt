import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isString } from '../validators_predicates.js';

export function validateSubject(options: VerifyOptions): VerifyOptions {
  if ('subject' in options) {
    if (!isString(options.subject)) {
      throw createSjwtValidationError('VerifyOptions.subject must be a string');
    }
  }

  return options;
}

export default validateSubject;
