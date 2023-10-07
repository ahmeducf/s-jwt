import { SjwtError } from '../../types/index.js';

function createSjwtError(name: string, message: string): SjwtError {
  const error = new Error();

  error.name = name;
  error.message = message;

  return error;
}

export default createSjwtError;
