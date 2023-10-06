import { SjwtTypeError } from '../../types/index.js';

function createSjwtTypeError(expected: string, actual: string): SjwtTypeError {
  const error = new Error();
  
  error.name = 'SjwtTypeError';
  error.message = `Expected type to be ${expected}, got ${actual}`;

  return error;
}

export default createSjwtTypeError;
