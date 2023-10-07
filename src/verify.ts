import { VerifyOptions, Payload } from './types/index.js';

export function verifySync(token: string, options: VerifyOptions): Payload {
  return { test: 'test' };
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
