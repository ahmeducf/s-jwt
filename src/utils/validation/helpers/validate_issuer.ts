import { VerifyOptions } from '../../../types/index.js';
import { createSjwtValidationError } from '../../../utils/error/index.js';
import { isString, isArrayOfStrings } from '../validators_predicates.js';

export function validateIssuer(options: VerifyOptions): VerifyOptions {
  if ('issuer' in options) {
    if (!isString(options.issuer) && !isArrayOfStrings(options.issuer)) {
      throw createSjwtValidationError(
        'VerifyOptions.issuer must be a string or an array of strings',
      );
    }
  }

  return options;
}

export default validateIssuer;
