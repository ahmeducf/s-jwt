import { verifyIssuer } from '../src/helpers/verify_payload_helpers.js';
import { Payload, VerifyOptions } from '../src/types/index.js';

describe('Verify Payload Issuer', () => {
  it('should verify a payload with no issuer', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(() => verifyIssuer(payload, options)).not.toThrow();
  });

  it('should verify a payload with issuer', () => {
    const payload: Payload = { foo: 'bar', iss: 'issuer' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 'issuer',
    };

    expect(() => verifyIssuer(payload, options)).not.toThrow();
  });

  it('should verify a payload with issuer in array', () => {
    const payload: Payload = { foo: 'bar', iss: 'issuer' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: ['issuer'],
    };

    expect(() => verifyIssuer(payload, options)).not.toThrow();
  });

  it('should throw an error if the payload.iss property is missing', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 'issuer',
    };

    expect(() => verifyIssuer(payload, options)).toThrow(
      'jwt issuer missing from payload',
    );
  });

  it('should throw an error if the payload.iss property is not a string', () => {
    const payload: Payload = { foo: 'bar', iss: 123 as never };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 'issuer',
    };

    expect(() => verifyIssuer(payload, options)).toThrow(
      'The payload.iss property must be a string.',
    );
  });

  it('should throw an error if the payload.iss property is not equal to the issuer', () => {
    const payload: Payload = { foo: 'bar', iss: 'issuer' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 'another issuer',
    };

    expect(() => verifyIssuer(payload, options)).toThrow(
      'jwt issuer invalid. expected: another issuer',
    );
  });

  it('should throw an error if the payload.iss property is not included in the issuer array', () => {
    const payload: Payload = { foo: 'bar', iss: 'issuer' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: ['another issuer'],
    };

    expect(() => verifyIssuer(payload, options)).toThrow(
      'jwt issuer invalid. expected one from: [another issuer]',
    );
  });
});
