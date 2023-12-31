import { VerifyOptions, Payload } from './types/index.js';
import {
  decodeToken,
  verifyHeader,
  verifyPayload,
  verifySignature,
  getSecretOrPublicKey,
} from './helpers/index.js';
import {
  validateVerifyOptions,
  validateToken,
} from './utils/validation/index.js';

export function verifySync(token: string, options: VerifyOptions): Payload {
  const validatedOptions = validateVerifyOptions(options);
  validateToken(token);

  const secretOrPublicKey = getSecretOrPublicKey(validatedOptions);
  const { header, payload } = decodeToken(token);

  verifyHeader(header, validatedOptions);
  verifySignature(token, header.alg, secretOrPublicKey);
  verifyPayload(payload, validatedOptions);

  return payload;
}

export async function verify(
  token: string,
  options: VerifyOptions,
): Promise<Payload> {
  return verifySync(token, options);
}

export default {
  verify,
  verifySync,
};
