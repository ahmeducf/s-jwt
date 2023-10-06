import { Base64Url } from '../../types/index.js';
import { createSjwtTypeError } from '../error/index.js';

const encode = (plainInput: string): string => {
  if (typeof plainInput !== 'string') {
    throw createSjwtTypeError('string', typeof plainInput);
  }

  const base64Input = Buffer.from(plainInput).toString('base64');
  const base64UrlInput = base64Input
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return base64UrlInput;
};

const decode = (base64UrlInput: string): string => {
  if (typeof base64UrlInput !== 'string') {
    throw createSjwtTypeError('string', typeof base64UrlInput);
  }

  const base64Input = base64UrlInput.replace(/-/g, '+').replace(/_/g, '/');
  const plainInput = Buffer.from(base64Input, 'base64').toString();

  return plainInput;
};

const fromBase64 = (base64Input: string): string => {
  if (typeof base64Input !== 'string') {
    throw createSjwtTypeError('string', typeof base64Input);
  }

  const base64UrlInput = base64Input
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return base64UrlInput;
};

const toBase64 = (base64UrlInput: string): string => {
  if (typeof base64UrlInput !== 'string') {
    throw createSjwtTypeError('string', typeof base64UrlInput);
  }

  const base64Input = base64UrlInput.replace(/-/g, '+').replace(/_/g, '/');

  return base64Input;
};

const base64url: Base64Url = {
  encode,
  decode,
  fromBase64,
  toBase64,
};

export default base64url;
