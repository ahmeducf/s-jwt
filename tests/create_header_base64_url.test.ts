import { createHeaderBase64Url } from '../src/helpers/index.js';
import base64url from '../src/utils/base64url/index.js';

describe('createHeaderBase64Url', () => {
  it('should create a base64url encoded header with default algorithm "HS256"', () => {
    const result = createHeaderBase64Url();
    const expected = base64url.encode(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );

    expect(result).toEqual(expected);
  });

  it('should create a base64url encoded header', () => {
    const result = createHeaderBase64Url('HS256');
    const expected = base64url.encode(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );

    expect(result).toEqual(expected);
  });

  it('should create a base64url encoded header', () => {
    const result = createHeaderBase64Url('RS256');
    const expected = base64url.encode(
      JSON.stringify({ alg: 'RS256', typ: 'JWT' }),
    );

    expect(result).toEqual(expected);
  });

  it('should throw an error if algorithm is not supported', () => {
    expect(() => createHeaderBase64Url('HS123' as never)).toThrowError(
      '"algorithm" must be one of the supported algorithms',
    );
  });
});
