import { SjwtVerificationError } from '../../types/index.js';

function createSjwtVerificationError(
  name: string,
  message: string,
): SjwtVerificationError {
  const error = new Error();

  error.name = name;
  error.message = message;

  return error;
}

export default createSjwtVerificationError;
