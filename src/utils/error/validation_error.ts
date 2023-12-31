import { SjwtValidationError } from '../../types/index.js';

function createSjwtValidationError(message: string): SjwtValidationError {
  const error = new Error();

  error.name = 'SjwtValidationError';
  error.message = message;

  return error;
}

export default createSjwtValidationError;
