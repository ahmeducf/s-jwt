import { BaseGenerateOptions } from './base_generate_options';

interface OptionsWithSecretKey extends BaseGenerateOptions {
  secretKey: string | Buffer;
}

interface OptionsWithPrivateKey extends BaseGenerateOptions {
  privateKey: string | Buffer;
}

export type GenerateOptions = OptionsWithSecretKey | OptionsWithPrivateKey;
