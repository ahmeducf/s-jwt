import ms from 'ms';
import { createPayloadBase64Url } from '../src/helpers/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';
import base64url from '../src/utils/base64url/index.js';

const ISSUED_AT_TIME = 1234567890;
jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

describe('createPayloadBase64Url', () => {
  it('should return a base64url encoded string and set iat claim by default', () => {
    const payload: Payload = {
      test: 'test',
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890 }),
    );

    expect(result).toEqual(expected);
  });

  it('should return a base64url encoded string with noTimestamp', () => {
    const payload: Payload = {
      test: 'test',
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
      noTimestamp: true,
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(JSON.stringify({ test: 'test' }));

    expect(result).toEqual(expected);
  });

  it('should throw an error if the iat claim is set with noTimestamp', () => {
    const payload: Payload = {
      test: 'test',
      iat: 1234567890,
    };

    const options: GenerateOptions = {
      secretKey: 'secret',
      noTimestamp: true,
    };

    expect(() => createPayloadBase64Url(payload, options)).toThrow(
      'You cannot set the "iat" claim when the "noTimestamp" option is set to "true".',
    );
  });

  it('should set exp claim with expiresIn as a number', () => {
    const payload: Payload = {
      test: 'test',
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
      expiresIn: 100,
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890, exp: 1234567990 }),
    );

    expect(result).toEqual(expected);
  });

  it('should set exp claim with expiresIn as a string', () => {
    const payload: Payload = {
      test: 'test',
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
      expiresIn: '1h',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({
        test: 'test',
        iat: 1234567890,
        exp: ISSUED_AT_TIME + ms(options.expiresIn as string) / 1000,
      }),
    );

    expect(result).toEqual(expected);
  });

  it('should override exp claim with expiresIn', () => {
    const payload: Payload = {
      test: 'test',
      exp: 1234567890,
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
      expiresIn: '1h',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({
        test: 'test',
        exp: ISSUED_AT_TIME + ms(options.expiresIn as string) / 1000,
        iat: 1234567890,
      }),
    );

    expect(result).toEqual(expected);
  });

  it('should use exp claim if expiresIn is undefined', () => {
    const payload: Payload = {
      test: 'test',
      exp: 1234567890,
    };
    const options: GenerateOptions = {
      secretKey: 'secret',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', exp: 1234567890, iat: 1234567890 }),
    );

    expect(result).toEqual(expected);
  });

  it('should set aud claim with audience as a string', () => {
    const payload: Payload = {
      test: 'test',
    };

    const options: GenerateOptions = {
      secretKey: 'secret',
      audience: 'test',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890, aud: 'test' }),
    );

    expect(result).toEqual(expected);
  });

  it('should set aud claim with audience as an array', () => {
    const payload: Payload = {
      test: 'test',
    };

    const options: GenerateOptions = {
      secretKey: 'secret',
      audience: ['test', 'test2'],
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890, aud: 'test test2' }),
    );

    expect(result).toEqual(expected);
  });

  it('should set iss claim with issuer', () => {
    const payload: Payload = {
      test: 'test',
    };

    const options: GenerateOptions = {
      secretKey: 'secret',
      issuer: 'test',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890, iss: 'test' }),
    );

    expect(result).toEqual(expected);
  });

  it('should set jti claim with jwtId', () => {
    const payload: Payload = {
      test: 'test',
    };

    const options: GenerateOptions = {
      secretKey: 'secret',
      jwtId: 'test',
    };

    const result = createPayloadBase64Url(payload, options);
    const expected = base64url.encode(
      JSON.stringify({ test: 'test', iat: 1234567890, jti: 'test' }),
    );

    expect(result).toEqual(expected);
  });
});
