import { KeyObject } from 'crypto';
import { GenerateOptions } from '../types/index.js';
import { createSjwtValidationError } from '../utils/error/index.js';
import { isPlainObject } from '../utils/validation/index.js';

export function getSecretOrPrivateKey(
  options: GenerateOptions,
): string | Buffer | KeyObject {
  if (!isPlainObject(options)) {
    throw createSjwtValidationError('"options" must be a plain object');
  }

  if (!('secretKey' in options) && !('privateKey' in options)) {
    throw createSjwtValidationError(
      '"secretKey" or "privateKey" must be provided',
    );
  } else if ('secretKey' in options && 'privateKey' in options) {
    throw createSjwtValidationError(
      '"secretKey" and "privateKey" cannot both be provided',
    );
  }

  if ('secretKey' in options) {
    return options.secretKey;
  }

  return options.privateKey;
}

export default getSecretOrPrivateKey;
