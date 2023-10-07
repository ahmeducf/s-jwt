import { KeyObject } from 'crypto';

export type SignatureFunction = (
  input: string,
  secret: string | Buffer | KeyObject,
) => string;
