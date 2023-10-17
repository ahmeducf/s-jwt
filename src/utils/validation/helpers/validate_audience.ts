import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import {
  isStringOrRegExp,
  isArrayOfStringsOrRegexps,
} from '../validators_predicates.js';

export function validateAudience(options: VerifyOptions): VerifyOptions {
  if ('audience' in options) {
    const { audience } = options;

    if (!isStringOrRegExp(audience) && !isArrayOfStringsOrRegexps(audience)) {
      throw createSjwtValidationError(
        'VerifyOptions.audience must be a string, a RegExp or an array of strings and/or RegExp',
      );
    }
  }

  return options;
}

export default validateAudience;
