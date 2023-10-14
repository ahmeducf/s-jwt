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

export const JWT_TOKEN_HEADER_INVALID = 'JWT_TOKEN_HEADER_INVALID';
export const JWT_TOKEN_HEADER_INVALID_ERROR_MSG =
  'Invalid JWT token header: The header is not a valid JSON object encoded in base64url format.';

export const JWT_TOKEN_PAYLOAD_INVALID = 'JWT_TOKEN_PAYLOAD_INVALID';
export const JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG =
  'Invalid JWT token payload: The payload is not a valid JSON object encoded in base64url format.';

export const JWT_SIGNATURE_INVALID = 'JWT_SIGNATURE_INVALID';
export const JWT_SIGNATURE_INVALID_ERROR_MSG =
  'Invalid JWT signature: The signature is not a valid base64url string.';

export default {
  ALGORITHMS,
  RSA_PRIVATE_KEY_INVALID,
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  ECDSA_PRIVATE_KEY_INVALID,
  ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  JWT_TOKEN_HEADER_INVALID,
  JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
  JWT_TOKEN_PAYLOAD_INVALID,
  JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
};
