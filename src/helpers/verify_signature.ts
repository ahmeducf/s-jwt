import { KeyObject } from 'crypto';
import { Algorithm } from '../types/index.js';
import { createVerificationFunction } from './create_verification_function.js';
import { createSjwtVerificationError } from '../utils/error/index.js';

export function verifySignature(
  jwtToken: string,
  algorithm: Algorithm,
  secretOrPublicKey: KeyObject,
): void {
  const [headerBase64Url, payloadBase64Url, signatureBase64Url] =
    jwtToken.split('.');

  const verificationFunction = createVerificationFunction(algorithm);

  const verificationInput = `${headerBase64Url}.${payloadBase64Url}`;

  const verificationResult = verificationFunction(
    verificationInput,
    signatureBase64Url,
    secretOrPublicKey,
  );

  if (!verificationResult) {
    throw createSjwtVerificationError(
      'InvalidSignature',
      'signature verification failed',
    );
  }
}

export default verifySignature;
