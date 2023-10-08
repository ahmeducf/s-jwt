import { KeyObject } from 'crypto';
import { GenerateOptions, Algorithm } from '../types/index.js';
import { createSjwtValidationError } from '../utils/error/index.js';
import {
  isPlainObject,
  isHmacAlgorithm,
  isAsymmetricKeyAlgorithm,
} from '../utils/validation/index.js';
import { HMAC_ALGORITHMS, ASYMMETRIC_KEY_ALGORITHMS } from '../constants.js';

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

  const algorithm: Algorithm = options.algorithm ? options.algorithm : 'HS256';

  if ('secretKey' in options) {
    if (!isHmacAlgorithm(algorithm)) {
      throw createSjwtValidationError(
        `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
          ', ',
        )}]`,
      );
    }

    return options.secretKey;
  }

  if (!isAsymmetricKeyAlgorithm(algorithm)) {
    throw createSjwtValidationError(
      `PrivateKey can only be used with supported asymmetric key algorithm [${ASYMMETRIC_KEY_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  }

  return options.privateKey;
}

export default getSecretOrPrivateKey;
