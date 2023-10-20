import { Algorithm } from './types/index.js';

export const HMAC_ALGORITHMS: Algorithm[] = ['HS256', 'HS384', 'HS512'];
export const RSA_ALGORITHMS: Algorithm[] = ['RS256', 'RS384', 'RS512'];
export const PSS_ALGORITHMS: Algorithm[] = ['PS256', 'PS384', 'PS512'];
export const ECDSA_ALGORITHMS: Algorithm[] = ['ES256', 'ES384', 'ES512'];

export const ASYMMETRIC_KEY_ALGORITHMS: Algorithm[] = [
  ...RSA_ALGORITHMS,
  ...ECDSA_ALGORITHMS,
  'PS256',
  'PS384',
  'PS512',
];

export const ALGORITHMS: Algorithm[] = [
  ...HMAC_ALGORITHMS,
  ...ASYMMETRIC_KEY_ALGORITHMS,
];

export const RSA_PRIVATE_KEY_INVALID: string = 'RsaPrivateKeyInvalid';
export const RSA_PRIVATE_KEY_INVALID_ERROR_MSG: string =
  'Invalid RSA private key: The provided private key is not supported.';
export const ECDSA_PRIVATE_KEY_INVALID: string = 'EcdsaPrivateKeyInvalid';
export const ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG: string =
  'Invalid ECDSA private key: The provided private key is not supported.';

export const JWT_TOKEN_HEADER_INVALID = 'JwtTokenHeaderInvalid';
export const JWT_TOKEN_HEADER_INVALID_ERROR_MSG =
  'Invalid JWT token header: The header is not a valid JSON object encoded in base64url format.';

export const JWT_TOKEN_PAYLOAD_INVALID = 'JwtTokenPayloadInvalid';
export const JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG =
  'Invalid JWT token payload: The payload is not a valid JSON object encoded in base64url format.';

export const JWT_SIGNATURE_INVALID = 'JwtSignatureInvalid';
export const JWT_SIGNATURE_INVALID_ERROR_MSG =
  'Invalid JWT signature: The signature is not a valid base64url string.';

export const JWT_TOKEN_MALFORMED = 'JwtTokenMalformed';
export const JWT_TOKEN_MALFORMED_ERROR_MSG =
  'Invalid JWT token: The token is not a valid JSON Web Token.';

export default {
  ALGORITHMS,
  HMAC_ALGORITHMS,
  RSA_ALGORITHMS,
  ECDSA_ALGORITHMS,
  ASYMMETRIC_KEY_ALGORITHMS,
  JWT_TOKEN_MALFORMED,
  JWT_TOKEN_MALFORMED_ERROR_MSG,
  JWT_SIGNATURE_INVALID,
  JWT_SIGNATURE_INVALID_ERROR_MSG,
  RSA_PRIVATE_KEY_INVALID,
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  ECDSA_PRIVATE_KEY_INVALID,
  ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  JWT_TOKEN_HEADER_INVALID,
  JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
  JWT_TOKEN_PAYLOAD_INVALID,
  JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
};
