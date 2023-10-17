import { KeyObject, createSecretKey, createPublicKey } from 'crypto';
import { VerifyOptions } from '../../../types/index.js';
import {
  createSjwtTypeError,
  createSjwtValidationError,
} from '../../error/index.js';
import {
  isHmacAlgorithm,
  isRsaAlgorithm,
  isPssAlgorithm,
  isEcdsaAlgorithm,
  isAlgorithm,
} from '../validators_predicates.js';
import {
  RSA_ALGORITHMS,
  PSS_ALGORITHMS,
  ECDSA_ALGORITHMS,
  HMAC_ALGORITHMS,
} from '../../../constants.js';

const ASYMMETRIC_KEY_TYPES = [
  {
    type: 'rsa',
    algorithms: RSA_ALGORITHMS,
    predicate: isRsaAlgorithm,
  },
  {
    type: 'rsa-pss',
    algorithms: PSS_ALGORITHMS,
    predicate: isPssAlgorithm,
  },
  {
    type: 'ec',
    algorithms: ECDSA_ALGORITHMS,
    predicate: isEcdsaAlgorithm,
  },
];

export function validateSecretOrPublicKey(
  options: VerifyOptions,
): VerifyOptions {
  const newOptions: VerifyOptions = { ...options };
  if (!('secretKey' in newOptions) && !('publicKey' in newOptions)) {
    throw createSjwtValidationError(
      '"secretKey" or "publicKey" must be provided',
    );
  } else if ('secretKey' in newOptions && 'publicKey' in newOptions) {
    throw createSjwtValidationError(
      '"secretKey" and "publicKey" cannot both be provided',
    );
  }

  if ('secretKey' in newOptions) {
    if (!(newOptions.secretKey instanceof KeyObject)) {
      try {
        newOptions.secretKey = createSecretKey(
          typeof newOptions.secretKey === 'string'
            ? Buffer.from(newOptions.secretKey)
            : newOptions.secretKey,
        );
      } catch (error) {
        throw createSjwtValidationError(
          '"secretKey" is not a valid key material for symmetric algorithms',
        );
      }
    } else if (newOptions.secretKey.type !== 'secret') {
      throw createSjwtValidationError(
        '"secretKey" must be a secret key material for symmetric algorithms',
      );
    }

    if (Array.isArray(newOptions.algorithms)) {
      newOptions.algorithms.forEach((algorithm) => {
        if (!isAlgorithm(algorithm)) {
          throw createSjwtTypeError('Algorithm', typeof algorithm);
        }
        if (!isHmacAlgorithm(algorithm)) {
          throw createSjwtValidationError(
            `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
              ', ',
            )}]`,
          );
        }
      });
    }

    return newOptions;
  }

  if ('publicKey' in newOptions) {
    if (!(newOptions.publicKey instanceof KeyObject)) {
      try {
        newOptions.publicKey = createPublicKey(newOptions.publicKey);
      } catch (error) {
        throw createSjwtValidationError(
          '"publicKey" is not a valid key material for asymmetric algorithms',
        );
      }
    } else if (newOptions.publicKey.type !== 'public') {
      throw createSjwtValidationError(
        '"publicKey" must be a public key material for asymmetric algorithms',
      );
    }

    if (Array.isArray(newOptions.algorithms)) {
      const { asymmetricKeyType } = newOptions.publicKey;
      const { algorithms } = newOptions;

      [...ASYMMETRIC_KEY_TYPES].forEach((obj) => {
        const { type, predicate } = obj;
        if (asymmetricKeyType === type) {
          algorithms.forEach((algorithm) => {
            if (!isAlgorithm(algorithm)) {
              throw createSjwtTypeError('Algorithm', typeof algorithm);
            }
            if (!predicate(algorithm)) {
              throw createSjwtValidationError(
                `PublicKey of asymmetric key type "${asymmetricKeyType}" can only be used with supported asymmetric key algorithm [${obj.algorithms.join(
                  ', ',
                )}]`,
              );
            }
          });
        }
      });
    }
  }

  return newOptions;
}

export default validateSecretOrPublicKey;
