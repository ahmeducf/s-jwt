// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bufferEqual from 'buffer-equal-constant-time';
import crypto, { KeyObject } from 'crypto';
import formatEcdsa from 'ecdsa-sig-formatter';
import { Algorithm, VerificationFunction } from '../types/index.js';
import base64url from '../utils/base64url/index.js';
import { createHmacSignatureFunction } from './create_signature_function.js';

function createHmacVerificationFunction(bits: string): VerificationFunction {
  return function hmacVerificationFunction(
    input: string,
    signature: string,
    secret: KeyObject,
  ): boolean {
    const computedSignature = createHmacSignatureFunction(bits)(input, secret);

    return bufferEqual(Buffer.from(signature), Buffer.from(computedSignature));
  };
}

function createRsaVerificationFunction(bits: string): VerificationFunction {
  return function rsaVerificationFunction(
    input: string,
    signature: string,
    publicKey: KeyObject,
  ): boolean {
    const signatureBase64: string = base64url.toBase64(signature);

    const verify = crypto.createVerify(`RSA-SHA${bits}`);

    verify.update(input);

    return verify.verify(publicKey, signatureBase64, 'base64');
  };
}

function createRsaPssVerificationFunction(bits: string): VerificationFunction {
  return function rsaPssVerificationFunction(
    input: string,
    signature: string,
    publicKey: KeyObject,
  ): boolean {
    const signatureBase64: string = base64url.toBase64(signature);

    const verify = crypto.createVerify(`RSA-SHA${bits}`);

    verify.update(input);

    return verify.verify(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
      },
      signatureBase64,
      'base64',
    );
  };
}

function createEcdsaVerificationFunction(bits: string): VerificationFunction {
  return function ecdsaVerificationFunction(
    input: string,
    signature: string,
    publicKey: KeyObject,
  ): boolean {
    const signatureBase64: string = formatEcdsa
      .joseToDer(base64url.toBase64(signature), `ES${bits}`)
      .toString('base64');

    const verify = crypto.createVerify(`RSA-SHA${bits}`);

    verify.update(input);

    return verify.verify(publicKey, signatureBase64, 'base64');
  };
}

const verificationFactories = {
  HS: createHmacVerificationFunction,
  RS: createRsaVerificationFunction,
  PS: createRsaPssVerificationFunction,
  ES: createEcdsaVerificationFunction,
};

export function createVerificationFunction(
  algorithm: Algorithm,
): VerificationFunction {
  const [type, bits] = [
    algorithm.slice(0, 2).toUpperCase() as keyof typeof verificationFactories,
    algorithm.slice(2),
  ];

  return verificationFactories[type](bits);
}

export default createVerificationFunction;
