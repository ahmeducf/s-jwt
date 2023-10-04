import { SecondsNumber } from './seconds_number';

export interface Payload {
  [key: string]: unknown;
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: SecondsNumber;
  iat?: SecondsNumber;
  jti?: string;
}
