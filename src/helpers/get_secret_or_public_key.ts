import { KeyObject } from 'crypto';
import { VerifyOptions } from '../types/index.js';

export function getSecretOrPublicKey(options: VerifyOptions): KeyObject {
  if ('secretKey' in options) {
    return options.secretKey as KeyObject;
  }
  return options.publicKey as KeyObject;
}

export default getSecretOrPublicKey;
