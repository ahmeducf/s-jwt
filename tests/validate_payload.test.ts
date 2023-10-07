import { validatePayload } from '../src/utils/validation/index.js';
import { Payload } from '../src/types/index.js';

describe('validatePayload', () => {
  it('should validate a valid payload', () => {
    const payload: Payload = {
      iss: 'https://example.com',
      sub: '1234567890',
      aud: 'clientID',
      exp: 1234567890,
      iat: 1234567890,
      jti: '1234567890',
    };

    expect(() => validatePayload(payload)).not.toThrow();
  });

  it('should validate a valid payload with custom claims', () => {
    const payload: Payload = {
      iss: 'https://example.com',
      sub: '1234567890',
      aud: 'clientID',
      exp: 1234567890,
      iat: 1234567890,
      jti: '1234567890',
      customClaim: 'custom claim',
    };

    expect(() => validatePayload(payload)).not.toThrow();
  });

  it('should validate a valid payload with no claims', () => {
    const payload: Payload = {};

    expect(() => validatePayload(payload)).not.toThrow();
  });

  it('should validate a valid payload with missing optional claims', () => {
    const payload: Payload = {
      iss: 'https://example.com',
      sub: '1234567890',
      aud: 'clientID',
    };

    expect(() => validatePayload(payload)).not.toThrow();
  });

  it('should throw an error if the payload is not an object', () => {
    const payload = 'not an object';

    expect(() => validatePayload(payload as never)).toThrow(
      '"payload" must be a plain object',
    );
  });

  it('should throw an error if the payload is null', () => {
    const payload = null;

    expect(() => validatePayload(payload as never)).toThrow(
      '"payload" must be a plain object',
    );
  });

  it('should throw an error if the payload is undefined', () => {
    const payload = undefined;

    expect(() => validatePayload(payload as never)).toThrow(
      '"payload" must be a plain object',
    );
  });

  it('should throw an error if the payload is an array', () => {
    const payload: never[] = [];

    expect(() => validatePayload(payload as never)).toThrow(
      '"payload" must be a plain object',
    );
  });

  it('should throw an error if the iss claim is not a string', () => {
    const payload: Payload = {
      iss: 1234567890 as never,
    };

    expect(() => validatePayload(payload)).toThrow('"iss" must be a string');
  });

  it('should throw an error if the sub claim is not a string', () => {
    const payload: Payload = {
      sub: 1234567890 as never,
    };

    expect(() => validatePayload(payload)).toThrow('"sub" must be a string');
  });

  it('should throw an error if the aud claim is not a string', () => {
    const payload: Payload = {
      aud: 1234567890 as never,
    };

    expect(() => validatePayload(payload)).toThrow('"aud" must be a string');
  });

  it('should throw an error if the exp claim is not a number', () => {
    const payload: Payload = {
      exp: '1234567890' as never,
    };

    expect(() => validatePayload(payload)).toThrow(
      '"exp" must be a positive integer',
    );
  });

  it('should throw an error if the iat claim is not a number', () => {
    const payload: Payload = {
      iat: '1234567890' as never,
    };

    expect(() => validatePayload(payload)).toThrow(
      '"iat" must be a positive integer',
    );
  });

  it('should throw an error if the jti claim is not a string', () => {
    const payload: Payload = {
      jti: 1234567890 as never,
    };

    expect(() => validatePayload(payload)).toThrow('"jti" must be a string');
  });
});
