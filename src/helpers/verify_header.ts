import { Header, VerifyOptions } from '../types/index.js';
import { createSjwtVerificationError } from '../utils/error/index.js';

export function verifyHeader(header: Header, options: VerifyOptions): void {
  const { algorithms } = options;
  const { alg, typ } = header;

  if (typ !== 'JWT') {
    throw createSjwtVerificationError(
      'InvalidTokenType',
      'Token type is not JWT',
    );
  }

  if (Array.isArray(algorithms) && !algorithms.includes(alg as never)) {
    throw createSjwtVerificationError(
      'InvalidAlgorithm',
      `Algorithm ${alg} is not included in the list of allowed "algorithms" ${algorithms.join(
        ', ',
      )}`,
    );
  }
}

export default verifyHeader;
