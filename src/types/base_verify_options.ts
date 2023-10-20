import { Algorithm } from './algorithm.js';
import { SecondsNumber } from './seconds_number.js';

export interface BaseVerifyOptions {
  algorithms?:
    | Algorithm[]
    | ['RS256', 'RS384', 'RS512']
    | ['PS256', 'PS384', 'PS512']
    | ['ES256', 'ES384', 'ES512']
    | ['HS256', 'HS384', 'HS512'];
  audience?: string | RegExp | (string | RegExp)[];
  issuer?: string | string[];
  jwtId?: string;
  subject?: string;
  ignoreExpiration?: boolean;
  clockTolerance?: SecondsNumber;
  maxAge?: string | SecondsNumber;
  clockTimestamp?: SecondsNumber;
}
