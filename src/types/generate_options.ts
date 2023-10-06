import { KeyObject } from 'crypto';
import { BaseGenerateOptions } from './base_generate_options';

interface OptionsWithSecretKey extends BaseGenerateOptions {
  secretKey: string | Buffer | KeyObject;
}

interface OptionsWithPrivateKey extends BaseGenerateOptions {
  privateKey: string | Buffer | KeyObject;
}

export type GenerateOptions = OptionsWithSecretKey | OptionsWithPrivateKey;
