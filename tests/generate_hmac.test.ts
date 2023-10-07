import crypto from 'crypto';
import { generateSync } from '../src/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';

describe('generate token with HMAC algorithm', () => {
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

  it('should return a jwt string with secretKey as Buffer', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: Buffer.from('test'),
    };

    const jwtToken = generateSync(payload, options);
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.vNi9dRvHYLssx8gJGEHFI_Qxws924N7w6tZNgpBQ6kM',
    );
  });

  it('should return a jwt string with secretKey as KeyObject', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: crypto.createSecretKey(Buffer.from('test')),
    };

    const jwtToken = generateSync(payload, options);
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.vNi9dRvHYLssx8gJGEHFI_Qxws924N7w6tZNgpBQ6kM',
    );
  });

  it('should return a jwt string with sha384 algorithm', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS384',
      secretKey: 'test',
    };

    const jwtToken = generateSync(payload, options);
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.ZdXxuB4RZsZcGrVwWGhB89C471J_ukYwZth4C4xyFTc1z7_P7QDNf_uj1Qacg4F-',
    );
  });

  it('should return a jwt string with sha512 algorithm', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'HS512',
      secretKey: 'test',
    };

    const jwtToken = generateSync(payload, options);
    expect(jwtToken).toBe(
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxMjM0NTY3ODkwLCJpYXQiOjEyMzQ1Njc4OTAsInRlc3QiOiJ0ZXN0In0.VNbzgCEUwIeG1kRAkqWHb6467mWBP9y4m97GUHvZKnCHRoNCydH7-gup5Ih5CmzJ6yrkoiZ8-8nqPp_rSBbUOg',
    );
  });
});
