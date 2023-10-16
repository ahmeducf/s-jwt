import { SecondsNumber } from './seconds_number.js';

export interface Payload {
  [key: string]: unknown;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: SecondsNumber;
  iat?: SecondsNumber;
  jti?: string;
}
