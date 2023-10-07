import { KeyObject } from 'crypto';
import { Algorithm } from '../types/index.js';
import createSignatureFunction from './create_signature_function.js';

function createJwtToken(
  headerBase64Url: string,
  payloadBase64Url: string,
  secretOrPrivateKey: string | Buffer | KeyObject,
  algorithm: Algorithm = 'HS256',
): string {
  const signatureFunction = createSignatureFunction(algorithm);

  const signatureBase64Url: string = signatureFunction(
    `${headerBase64Url}.${payloadBase64Url}`,
    secretOrPrivateKey,
  );

  return `${headerBase64Url}.${payloadBase64Url}.${signatureBase64Url}`;
}

export default createJwtToken;
