import crypto, { KeyObject } from 'crypto';
import formatEcdsa from 'ecdsa-sig-formatter';
import { Algorithm, SignatureFunction } from '../types/index.js';
import base64url from '../utils/base64url/index.js';
import { createSjwtError } from '../utils/error/index.js';
import {
  ECDSA_PRIVATE_KEY_INVALID,
  ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  RSA_PRIVATE_KEY_INVALID,
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
} from '../constants.js';

export function createHmacSignatureFunction(bits: string): SignatureFunction {
  return function hmacSignatureFunction(
    input: string,
    secret: string | Buffer | KeyObject,
  ): string {
    const hmac = crypto.createHmac(`sha${bits}`, secret);

    hmac.update(input);
    const signatureBase64: string = hmac.digest('base64');

    const signatureBase64Url: string = base64url.fromBase64(signatureBase64);

    return signatureBase64Url;
  };
}

function createRsaSignatureFunction(bits: string): SignatureFunction {
  return function rsaSignatureFunction(
    input: string,
    privateKey: string | Buffer | KeyObject,
  ): string {
    const sign = crypto.createSign(`RSA-SHA${bits}`);

    sign.update(input);

    let signatureBase64: string;

    try {
      signatureBase64 = sign.sign(privateKey, 'base64');
    } catch (error) {
      throw createSjwtError(
        RSA_PRIVATE_KEY_INVALID,
        RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
      );
    }

    const signatureBase64Url: string = base64url.fromBase64(signatureBase64);

    return signatureBase64Url;
  };
}

function createRsaPssSignatureFunction(bits: string): SignatureFunction {
  return function RsaPssSignatureFunction(
    input: string,
    privateKey: string | Buffer | KeyObject,
  ): string {
    let key;
    if (typeof privateKey === 'string' || privateKey instanceof Buffer) {
      key = privateKey;
    } else {
      key = privateKey.export({ type: 'pkcs8', format: 'pem' });
    }

    const sign = crypto.createSign(`RSA-SHA${bits}`);

    sign.update(input);

    let signatureBase64: string;
    try {
      signatureBase64 = sign.sign(
        {
          key,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
        },
        'base64',
      );
    } catch (error) {
      throw createSjwtError(
        RSA_PRIVATE_KEY_INVALID,
        RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
      );
    }

    const signatureBase64Url: string = base64url.fromBase64(signatureBase64);

    return signatureBase64Url;
  };
}

function createEcdsaSignatureFunction(bits: string): SignatureFunction {
  return function ecdsaSignatureFunction(
    input: string,
    privateKey: string | Buffer | KeyObject,
  ): string {
    let signatureBase64Url: string;
    const sign = crypto.createSign(`RSA-SHA${bits}`);

    sign.update(input);
    let signatureBase64: string;
    try {
      signatureBase64 = sign.sign(privateKey, 'base64');

      signatureBase64Url = base64url.fromBase64(
        formatEcdsa.derToJose(signatureBase64, `ES${bits}`),
      );
    } catch (error) {
      throw createSjwtError(
        ECDSA_PRIVATE_KEY_INVALID,
        ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
      );
    }

    return signatureBase64Url;
  };
}

const signatureFactories = {
  HS: createHmacSignatureFunction,
  RS: createRsaSignatureFunction,
  PS: createRsaPssSignatureFunction,
  ES: createEcdsaSignatureFunction,
};

export function createSignatureFunction(
  algorithm: Algorithm,
): SignatureFunction {
  const [type, bits] = [
    algorithm.slice(0, 2).toUpperCase() as keyof typeof signatureFactories,
    algorithm.slice(2),
  ];

  return signatureFactories[type](bits);
}

export default createSignatureFunction;
