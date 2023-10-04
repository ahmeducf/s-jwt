import { Algorithm } from './algorithm';

type SecondsNumber = number;

export interface BaseGenerateOptions {
  algorithm?: Algorithm | 'HS256';
  expiresIn?: string | SecondsNumber;
  audience?: string | string[];
  issuer?: string;
  jwtId?: string;
  subject?: string;
  noTimestamp?: boolean;
}
