import { Algorithm } from '../types';
import base64url from '../utils/base64url/index.js';
import { createSjwtValidationError } from '../utils/error/index.js';
import { isAlgorithm } from '../utils/validation/index.js';

function createHeaderBase64Url(algorithm: Algorithm = 'HS256'): string {
  if (!isAlgorithm(algorithm)) {
    throw createSjwtValidationError(
      '"algorithm" must be one of the supported algorithms',
    );
  }

  const header = {
    alg: algorithm,
    typ: 'JWT',
  };

  const headerJsonString = JSON.stringify(header);
  const headerBase64Url = base64url.encode(headerJsonString);

  return headerBase64Url;
}

export default createHeaderBase64Url;
