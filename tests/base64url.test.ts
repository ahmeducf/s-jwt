import base64url from '../src/utils/base64url';

describe('base64url', () => {
  it('should encode a string', () => {
    const plainInput = 'Hello World!';
    const base64UrlInput = base64url.encode(plainInput);

    expect(base64UrlInput).toEqual('SGVsbG8gV29ybGQh');
  });

  it('should decode a string', () => {
    const base64UrlInput = 'SGVsbG8gV29ybGQh';
    const plainInput = base64url.decode(base64UrlInput);

    expect(plainInput).toEqual('Hello World!');
  });

  it('should convert a base64 string to base64url', () => {
    const base64Input = 'SGVsbG8gV29ybGQh';
    const base64UrlInput = base64url.fromBase64(base64Input);

    expect(base64UrlInput).toEqual('SGVsbG8gV29ybGQh');
  });

  it('should convert a base64 string with symbols (+, /, =) to base64url', () => {
    const base64Input = 'SGVsbG8gV29ybGQh+/=';
    const base64UrlInput = base64url.fromBase64(base64Input);

    expect(base64UrlInput).toEqual('SGVsbG8gV29ybGQh-_');
  });

  it('should convert a base64url string to base64', () => {
    const base64UrlInput = 'SGVsbG8gV29ybGQh';
    const base64Input = base64url.toBase64(base64UrlInput);

    expect(base64Input).toEqual('SGVsbG8gV29ybGQh');
  });

  it('should convert a base64url string with symbols (-, _) to base64', () => {
    const base64UrlInput = 'SGVsbG8gV29ybGQh-_';
    const base64Input = base64url.toBase64(base64UrlInput);

    expect(base64Input).toEqual('SGVsbG8gV29ybGQh+/');
  });
});
