import { verifySubject } from '../src/helpers/verify_payload_helpers.js';
import { Payload, VerifyOptions } from '../src/types/index.js';

describe('Verify Payload Subject', () => {
  it('should verify a payload with no subject', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(() => verifySubject(payload, options)).not.toThrow();
  });

  it('should verify a payload with subject', () => {
    const payload: Payload = { foo: 'bar', sub: 'subject' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 'subject',
    };

    expect(() => verifySubject(payload, options)).not.toThrow();
  });

  it('should throw an error if the payload.sub property is not a string', () => {
    const payload: Payload = { foo: 'bar', sub: 123 as never };
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 'subject',
    };

    expect(() => verifySubject(payload, options)).toThrow(
      'The payload.sub property must be a string.',
    );
  });

  it('should throw an error if the payload.sub property is not equal to the subject', () => {
    const payload: Payload = { foo: 'bar', sub: 'subject' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 'invalid',
    };

    expect(() => verifySubject(payload, options)).toThrow(
      'jwt subject invalid. expected: invalid',
    );
  });

  it('should throw an error if the payload.sub property is missing', () => {
    const payload: Payload = { foo: 'bar' };
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 'subject',
    };

    expect(() => verifySubject(payload, options)).toThrow(
      'jwt subject missing from payload',
    );
  });
});
