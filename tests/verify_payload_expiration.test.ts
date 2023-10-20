import { verifyExpiration } from '../src/helpers/verify_payload_helpers.js';
import { Payload, VerifyOptions } from '../src/types/index.js';

describe('verify Payload Expiration', () => {
  it('should verify a payload with no expiration', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      ignoreExpiration: true,
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should verify a payload with expiration', () => {
    const payload: Payload = {
      foo: 'bar',
      exp: Math.floor(Date.now() / 1000) + 600,
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      ignoreExpiration: false,
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should ignore expiration if ignoreExpiration is true', () => {
    const payload: Payload = { foo: 'bar', exp: Date.now() / 1000 - 600 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      ignoreExpiration: true,
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should throw an error if the payload.exp property is not a number', () => {
    const payload: Payload = { foo: 'bar', exp: 'not a number' as never };
    const options: VerifyOptions = {
      secretKey: 'secret',
    };
    expect(() => verifyExpiration(payload, options)).toThrow(
      'Expected type to be number, got string',
    );
  });

  it('should work with clockTolerance', () => {
    const payload: Payload = { foo: 'bar', exp: Date.now() / 1000 - 5 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTolerance: 10,
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should work with clockTimestamp', () => {
    const payload: Payload = { foo: 'bar', exp: Date.now() / 1000 - 5 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTimestamp: Math.floor(Date.now() / 1000 - 10),
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should verify a payload with non exceeded maxAge', () => {
    const payload: Payload = { foo: 'bar', iat: Date.now() / 1000 - 5 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: 10,
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should verify a payload with non exceeded maxAge (string)', () => {
    const payload: Payload = { foo: 'bar', iat: Date.now() / 1000 - 5 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: '10s',
    };
    expect(() => verifyExpiration(payload, options)).not.toThrow();
  });

  it('should throw an error if the payload.iat property is not a number', () => {
    const payload: Payload = { foo: 'bar', iat: 'not a number' as never };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: 10,
    };
    expect(() => verifyExpiration(payload, options)).toThrow(
      'Expected type to be number, got string',
    );
  });

  it('should throw an error if the maxAge option is not a number or a string', () => {
    const payload: Payload = { foo: 'bar', iat: Date.now() / 1000 - 5 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: {} as never,
    };
    expect(() => verifyExpiration(payload, options)).toThrow(
      'The maxAge option must be a number of seconds or string representing a timespan eg: "1d", "20h", 60',
    );
  });

  it('should throw an error if the maxAge is exceeded', () => {
    const payload: Payload = { foo: 'bar', iat: Date.now() / 1000 - 15 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: 10,
    };
    expect(() => verifyExpiration(payload, options)).toThrow(
      'Expired token: jwt maxAge exceeded',
    );
  });

  it('should throw an error if the maxAge is exceeded (string)', () => {
    const payload: Payload = { foo: 'bar', iat: Date.now() / 1000 - 15 };
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: '10s',
    };
    expect(() => verifyExpiration(payload, options)).toThrow(
      'Expired token: jwt maxAge exceeded',
    );
  });
});
