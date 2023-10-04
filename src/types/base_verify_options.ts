import { Algorithm } from './algorithm';
import { SecondsNumber } from './seconds_number';

export interface BaseVerifyOptions {
  algorithms?: Algorithm[] | ['RS256', 'RS384', 'RS512'];
  audience?: string | RegExp | (string | RegExp)[];
  issuer?: string | string[];
  jwtId?: string;
  subject?: string;
  ignoreExpiration?: boolean;
  clockTolerance?: SecondsNumber;
  maxAge?: string | SecondsNumber;
  clockTimestamp?: SecondsNumber;
}
