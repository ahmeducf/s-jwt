import { KeyObject } from 'crypto';
import { BaseGenerateOptions } from './base_generate_options.js';

interface GenerateOptionsWithSecretKey extends BaseGenerateOptions {
  secretKey: string | Buffer | KeyObject;
}

interface GenerateOptionsWithPrivateKey extends BaseGenerateOptions {
  privateKey: string | Buffer | KeyObject;
}

export type GenerateOptions = GenerateOptionsWithSecretKey | GenerateOptionsWithPrivateKey;
