import { KeyObject } from 'crypto';
import { VerifyOptions } from '../../types/index.js';
import {
  createSjwtTypeError,
  createSjwtValidationError,
} from '../../utils/error/index.js';
import { isPlainObject } from './validators_predicates.js';
import {
  validateAlgorithms,
  validateSecretOrPublicKey,
  validateAudience,
  validateIssuer,
  validateJwtId,
  validateSubject,
  validateIgnoreExpiration,
  validateClockTolerance,
  validateMaxAge,
  validateClockTimestamp,
} from './helpers/index.js';

export function validateVerifyOptions(options: VerifyOptions): VerifyOptions {
  if (options === undefined) {
    throw createSjwtValidationError('Options must be provided');
  } else if (!isPlainObject(options)) {
    throw createSjwtTypeError('VerifyOptions', typeof options);
  }

  let newOptions: VerifyOptions;

  newOptions = validateSecretOrPublicKey(options);

  const secretOrPublicKey: KeyObject =
    'secretKey' in newOptions
      ? (newOptions.secretKey as KeyObject)
      : (newOptions.publicKey as KeyObject);

  newOptions = validateAlgorithms(options, secretOrPublicKey);
  newOptions = validateAudience(newOptions);
  newOptions = validateIssuer(newOptions);
  newOptions = validateJwtId(newOptions);
  newOptions = validateSubject(newOptions);
  newOptions = validateIgnoreExpiration(newOptions);
  newOptions = validateClockTolerance(newOptions);
  newOptions = validateMaxAge(newOptions);
  newOptions = validateClockTimestamp(newOptions);

  return newOptions;
}

export default validateVerifyOptions;
