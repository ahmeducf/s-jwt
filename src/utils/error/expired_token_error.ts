import { SjwtExpiredTokenError } from '../../types/index.js';

function createSjwtExpiredTokenError(
  message: string,
  expiredAt: Date,
): SjwtExpiredTokenError {
  const error: SjwtExpiredTokenError = Object.assign(new Error(message), {
    name: 'SjwtExpiredTokenError',
    expiredAt,
  });

  return error;
}

export default createSjwtExpiredTokenError;
