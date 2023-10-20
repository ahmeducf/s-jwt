import { KeyObject } from 'crypto';
import { BaseVerifyOptions } from './base_verify_options.js';

interface VerifyOptionsWithSecretKey extends BaseVerifyOptions {
  secretKey: string | Buffer | KeyObject;
}

interface VerifyOptionsWithPublicKey extends BaseVerifyOptions {
  publicKey: string | Buffer | KeyObject;
}

export type VerifyOptions = VerifyOptionsWithSecretKey | VerifyOptionsWithPublicKey;
