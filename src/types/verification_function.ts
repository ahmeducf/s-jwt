import { KeyObject } from 'crypto';

export type VerificationFunction = (
  input: string,
  signature: string,
  secret: KeyObject,
) => boolean;
