import { validateToken } from '../src/utils/validation/index.js';
import { JWT_TOKEN_MALFORMED_ERROR_MSG } from '../src/constants.js';

describe('validateToken', () => {
  it('should throw an error if token is undefined', () => {
    expect(() => validateToken(undefined as never)).toThrowError(
      'Token must be provided',
    );
  });

  it('should throw an error if token is not a string', () => {
    expect(() => validateToken(123 as never)).toThrowError(
      'Expected type to be string, got number',
    );
  });

  it('should throw an error if token is not a valid JWT', () => {
    expect(() => validateToken('invalid')).toThrowError(
      JWT_TOKEN_MALFORMED_ERROR_MSG,
    );
  });

  it("should throw an error if token doesn't contain exactly 3 parts", () => {
    expect(() => validateToken('a.b.c.d')).toThrowError(
      JWT_TOKEN_MALFORMED_ERROR_MSG,
    );
  });

  it('should not throw an error if token is a valid JWT', () => {
    expect(() => validateToken('valid.token.here')).not.toThrowError();
  });

  test('a.b. should not throw an error', () => { 
    expect(() => validateToken('a.b.')).not.toThrowError();
  });

  test('a.b should throw an error', () => {
    expect(() => validateToken('a.b')).toThrowError(
      JWT_TOKEN_MALFORMED_ERROR_MSG,
    );
  })
});
