import { decodeToken } from '../src/helpers/index.js';
import base64url from '../src/utils/base64url/index.js';
import {
  JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
  JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
} from '../src/constants.js';

describe('decodeToken', () => {
  let VALID_TOKEN: string;
  let INVALID_TOKEN_HEADER: string;
  let INVALID_TOKEN_PAYLOAD: string;
  beforeAll(() => {
    VALID_TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    INVALID_TOKEN_HEADER =
      'invalid.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    INVALID_TOKEN_PAYLOAD =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  });

  it('should decode a valid token', () => {
    const { header, payload, signature } = decodeToken(VALID_TOKEN);
    expect(header).toEqual({
      alg: 'HS256',
      typ: 'JWT',
    });
    expect(payload).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
    expect(signature).toEqual(
      base64url.decode('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'),
    );
  });

  it('should throw an error when token header is invalid', () => {
    expect(() => decodeToken(INVALID_TOKEN_HEADER)).toThrow(
      JWT_TOKEN_HEADER_INVALID_ERROR_MSG,
    );
  });

  it('should throw an error when token payload is invalid', () => {
    expect(() => decodeToken(INVALID_TOKEN_PAYLOAD)).toThrow(
      JWT_TOKEN_PAYLOAD_INVALID_ERROR_MSG,
    );
  });
});
