import { KeyObject } from 'crypto';
import { VerifyOptions } from '../../../types/index.js';
import {
  createSjwtTypeError,
  createSjwtValidationError,
} from '../../../utils/error/index.js';
import { isAlgorithm } from '../validators_predicates.js';
import {
  RSA_ALGORITHMS,
  ECDSA_ALGORITHMS,
  HMAC_ALGORITHMS,
  PSS_ALGORITHMS,
} from '../../../constants.js';

export function validateAlgorithms(
  options: VerifyOptions,
  secretOrPublicKey: KeyObject,
): VerifyOptions {
  const { algorithms } = options;
  const newOptions: VerifyOptions = options;

  if (algorithms === undefined) {
    if (secretOrPublicKey.type === 'secret') {
      newOptions.algorithms = HMAC_ALGORITHMS;
    } else if (secretOrPublicKey.asymmetricKeyType === 'rsa') {
      newOptions.algorithms = RSA_ALGORITHMS;
    } else if (secretOrPublicKey.asymmetricKeyType === 'rsa-pss') {
      newOptions.algorithms = PSS_ALGORITHMS;
    } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
      newOptions.algorithms = ECDSA_ALGORITHMS;
    } else {
      newOptions.algorithms = RSA_ALGORITHMS;
    }
  } else if (Array.isArray(algorithms)) {
    if (algorithms.length === 0) {
      throw createSjwtValidationError(
        'Algorithms array must contain at least one algorithm',
      );
    }

    algorithms.forEach((algorithm) => {
      if (!isAlgorithm(algorithm)) {
        throw createSjwtTypeError('Algorithm', typeof algorithm);
      }
    });
  } else {
    throw createSjwtTypeError('Algorithms', typeof algorithms);
  }

  return newOptions;
}

export default validateAlgorithms;
