import { Payload, VerifyOptions } from '../types/index.js';
import {
  verifyExpiration,
  verifyIssuer,
  verifySubject,
  verifyAudience,
  verifyJwtId,
} from './verify_payload_helpers.js';

export function verifyPayload(payload: Payload, options: VerifyOptions): void {
  verifyExpiration(payload, options);
  verifyIssuer(payload, options);
  verifySubject(payload, options);
  verifyAudience(payload, options);
  verifyJwtId(payload, options);
}

export default verifyPayload;
