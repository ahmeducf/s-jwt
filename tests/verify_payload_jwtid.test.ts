import { verifyJwtId } from '../src/helpers/verify_payload_helpers.js';
import { Payload, VerifyOptions } from '../src/types/index.js';

describe('Verify Payload JWT ID', () => {
  it('should verify a payload with no jwtId', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(() => verifyJwtId(payload, options)).not.toThrow();
  });

  it('should verify a payload with jwtId', () => {
    const payload: Payload = { foo: 'bar', jti: 'jwtId' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 'jwtId',
    };

    expect(() => verifyJwtId(payload, options)).not.toThrow();
  });

  it('should throw an error if the payload.jti property is not a string', () => {
    const payload: Payload = { foo: 'bar', jti: 123 as never };
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 'jwtId',
    };

    expect(() => verifyJwtId(payload, options)).toThrow(
      'Expected type to be string, got number',
    );
  });

  it('should throw an error if the payload.jti property is not equal to the jwtId', () => {
    const payload: Payload = { foo: 'bar', jti: 'jwtId' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 'invalid',
    };

    expect(() => verifyJwtId(payload, options)).toThrow(
      'jwt jwtId invalid. expected: invalid',
    );
  });

  it('should throw an error if the payload.jti property is missing', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 'jwtId',
    };

    expect(() => verifyJwtId(payload, options)).toThrow(
      'jwt jwtId missing from payload',
    );
  });
});
