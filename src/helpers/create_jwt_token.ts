import { KeyObject } from 'crypto';
import { Algorithm } from '../types';

function createJwtToken(
  headerBase64Url: string,
  payloadBase64Url: string,
  secretOrPrivateKey: string | Buffer | KeyObject,
  algorithm: Algorithm = 'HS256',
): Promise<string> {
  return Promise.resolve('test.test.test');
}

export default createJwtToken;
