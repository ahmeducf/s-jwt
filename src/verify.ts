import { VerifyOptions, Payload } from './types/index.js';

async function verify(token: string, options: VerifyOptions): Promise<Payload> {
  return { test: 'test' };
}

export default verify;
