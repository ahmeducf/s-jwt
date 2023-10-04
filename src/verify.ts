import { VerifyOptions, Payload } from './types';

async function verify(token: string, options: VerifyOptions): Promise<Payload> {
  return { test: 'test' };
}

export default verify;
