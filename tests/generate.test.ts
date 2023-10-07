import { generate, generateSync } from '../src/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';

describe('generate', () => {
  it('should return a jwt string promise', async () => {
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
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.vNi9dRvHYLssx8gJGEHFI_Qxws924N7w6tZNgpBQ6kM',
    );
  });
});

describe('generateSync', () => { 
  it('should return a jwt string', () => {
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

    const jwtToken = generateSync(payload, options);
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.vNi9dRvHYLssx8gJGEHFI_Qxws924N7w6tZNgpBQ6kM',
    );
  });
});