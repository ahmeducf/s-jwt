import { Algorithm } from './types/index.js';

export const HMAC_ALGORITHMS: Algorithm[] = ['HS256', 'HS384', 'HS512'];

export const ASYMMETRIC_KEY_ALGORITHMS: Algorithm[] = [
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
];

export const ALGORITHMS: Algorithm[] = [
  ...HMAC_ALGORITHMS,
  ...ASYMMETRIC_KEY_ALGORITHMS,
];

export const RSA_PRIVATE_KEY_INVALID: string = 'RSA_PRIVATE_KEY_INVALID';
export const RSA_PRIVATE_KEY_INVALID_ERROR_MSG: string =
  'Invalid RSA private key: The provided private key is not supported.';
export const ECDSA_PRIVATE_KEY_INVALID: string = 'ECDSA_PRIVATE_KEY_INVALID';
export const ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG: string =
  'Invalid ECDSA private key: The provided private key is not supported.';

export default {
  ALGORITHMS,
  RSA_PRIVATE_KEY_INVALID,
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
};
