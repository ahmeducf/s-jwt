import { verifyAudience } from '../src/helpers/verify_payload_helpers.js';
import { Payload, VerifyOptions } from '../src/types/index.js';

describe('Verify Payload Audience', () => {
  it('should verify when audience is undefined', () => {
    const payload: Payload = {
      foo: 'bar',
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is string', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: 'my_audience',
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: 'my_audience',
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is string[]', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: 'my_audience',
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: ['my_audience'],
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is string[] and payload.aud is string[]', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: ['my_audience'],
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: ['my_audience'],
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is string[] and payload.aud is string', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: 'my_audience',
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: ['my_audience'],
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is string and payload.aud is string[]', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: ['my_audience'],
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: 'my_audience',
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is RegExp', () => {
    const payload = {
      foo: 'bar',
      aud: 'my_audience',
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: /my_audience/,
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should verify when audience is (string | RegExp)[]', () => {
    const payload = {
      foo: 'bar',
      aud: 'my_audience',
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: [/my_audience/, 'my_audience'],
    };

    expect(() => verifyAudience(payload, options)).not.toThrow();
  });

  it('should throw an error when payload.aud is undefined', () => {
    const payload: Payload = {
      foo: 'bar',
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: 'my_audience',
    };

    expect(() => verifyAudience(payload, options)).toThrow(
      'jwt audience missing from payload',
    );
  });

  it('should throw an error when payload.aud is not a string or string[]', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: 123 as never,
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: 'my_audience',
    };

    expect(() => verifyAudience(payload, options)).toThrow(
      'The payload.aud property must be a string or an array of strings.',
    );
  });

  it('should throw an error when no match is found', () => {
    const payload: Payload = {
      foo: 'bar',
      aud: 'my_audience',
    };
    const options: VerifyOptions = {
      secretKey: 'secret',
      audience: 'my_audience_2',
    };

    expect(() => verifyAudience(payload, options)).toThrow(
      'jwt audience invalid',
    );
  });
});
