import { KeyObject } from 'crypto';
import { BaseVerifyOptions } from './base_verify_options.js';

interface OptionsWithSecretKey extends BaseVerifyOptions {
  secretKey: string | Buffer | KeyObject;
}

interface OptionsWithPublicKey extends BaseVerifyOptions {
  publicKey: string | Buffer | KeyObject;
}

export type VerifyOptions = OptionsWithSecretKey | OptionsWithPublicKey;
