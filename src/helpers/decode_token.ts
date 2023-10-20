import { Header, Payload } from '../types/index.js';
import base64url from '../utils/base64url/index.js';
import { createSjwtError } from '../utils/error/index.js';
import {
  JWT_TOKEN_HEADER_INVALID,
  JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
  JWT_TOKEN_PAYLOAD_INVALID,
  JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
  JWT_SIGNATURE_INVALID,
  JWT_SIGNATURE_INVALID_ERROR_MSG,
} from '../constants.js';

export function decodeToken(token: string) {
  let header: Header;
  let payload: Payload;
  let signature: string;
  const [headerBase64Url, payloadBase64Url, signatureBase64Url]: string[] =
    token.split('.');

  try {
    header = JSON.parse(base64url.decode(headerBase64Url));
  } catch (error) {
    throw createSjwtError(
      JWT_TOKEN_HEADER_INVALID,
      JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
    );
  }

  try {
    payload = JSON.parse(base64url.decode(payloadBase64Url));
  } catch (error) {
    throw createSjwtError(
      JWT_TOKEN_PAYLOAD_INVALID,
      JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
    );
  }

  try {
    signature = base64url.decode(signatureBase64Url);
  } catch (error) {
    throw createSjwtError(
      JWT_SIGNATURE_INVALID,
      JWT_SIGNATURE_INVALID_ERROR_MSG,
    );
  }

  return {
    header,
    payload,
    signature,
  };
}

export default decodeToken;
