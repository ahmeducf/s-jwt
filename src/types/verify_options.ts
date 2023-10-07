import { BaseVerifyOptions } from './base_verify_options.js';

interface OptionsWithSecretKey extends BaseVerifyOptions {
  secretKey: string | Buffer;
}

interface OptionsWithPublicKey extends BaseVerifyOptions {
  publicKey: string | Buffer;
}

export type VerifyOptions = OptionsWithSecretKey | OptionsWithPublicKey;
