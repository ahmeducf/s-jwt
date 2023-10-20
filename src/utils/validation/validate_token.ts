import {
  createSjwtError,
  createSjwtTypeError,
  createSjwtValidationError,
} from '../error/index.js';
import {
  JWT_TOKEN_MALFORMED,
  JWT_TOKEN_MALFORMED_ERROR_MSG,
} from '../../constants.js';

export function validateToken(token: string): void {
  if (token === undefined) {
    throw createSjwtValidationError('Token must be provided');
  }

  if (typeof token !== 'string') {
    throw createSjwtTypeError('string', typeof token);
  }

  if (token.split('.').length !== 3) {
    throw createSjwtError(JWT_TOKEN_MALFORMED, JWT_TOKEN_MALFORMED_ERROR_MSG);
  }
}

export default validateToken;
