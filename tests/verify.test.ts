import { generate, generateSync, verify, verifySync } from '../src/index.js';
import { Payload, GenerateOptions, VerifyOptions } from '../src/types/index.js';
import {
  HMAC_ALGORITHMS,
  ASYMMETRIC_KEY_ALGORITHMS,
} from '../src/constants.js';

describe('verify', () => {
  it('should return payload in JSON format if the token is valid', async () => {
    const payload: Payload = {
      iss: 'test',
      exp: Date.now() + 1000,
      iat: Date.now(),
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: 'test',
    };
    const jwtToken = await generate(payload, options);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    const result = await verify(jwtToken, verifyOptions);

    expect(result).toEqual(payload);
  });
});

describe('verifySync', () => { 
  it('should return payload in JSON format if the token is valid', () => {
    const payload: Payload = {
      iss: 'test',
      exp: Date.now() + 1000,
      iat: Date.now(),
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: 'test',
    };
    const jwtToken = generateSync(payload, options);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(payload);
  });
});