import { generate } from '../src/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';

describe('generate', () => {
  it('should return a jwt string', async () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: 'test',
    };
    
    const jwtToken = await generate(payload, options);
    expect(jwtToken).toBe('test.test.test');
  });
});
