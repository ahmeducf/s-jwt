import { Algorithm } from './types/index.js';

export const ALGORITHMS: Algorithm[] = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'PS256',
  'PS384',
  'PS512',
];

export const RSA_PRIVATE_KEY_INVALID: string = 'RSA_PRIVATE_KEY_INVALID';
export const RSA_PRIVATE_KEY_INVALID_ERROR_MSG: string =
  'Invalid RSA private key: The provided private key is not supported.';

export default {
  ALGORITHMS,
  RSA_PRIVATE_KEY_INVALID,
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
};
