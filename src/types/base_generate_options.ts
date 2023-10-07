import { Algorithm } from './algorithm.js';

type SecondsNumber = number;

export interface BaseGenerateOptions {
  algorithm?: Algorithm;
  expiresIn?: string | SecondsNumber;
  audience?: string | string[];
  issuer?: string;
  jwtId?: string;
  subject?: string;
  noTimestamp?: boolean;
}
