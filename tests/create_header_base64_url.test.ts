import { createHeaderBase64Url } from '../src/helpers/index.js';

describe('createHeaderBase64Url', () => {
  it('should create a base64url encoded header with default algorithm "HS256"', () => {
    const headerBase64Url = createHeaderBase64Url();
    expect(headerBase64Url).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  it('should create a base64url encoded header', () => {
    const headerBase64Url = createHeaderBase64Url('HS256');
    expect(headerBase64Url).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  it('should create a base64url encoded header', () => {
    const headerBase64Url = createHeaderBase64Url('RS256');
    expect(headerBase64Url).toEqual('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  it('should throw an error if algorithm is not supported', () => {
    expect(() => createHeaderBase64Url('HS123' as never)).toThrowError(
      '"algorithm" must be one of the supported algorithms',
    );
  });
});
