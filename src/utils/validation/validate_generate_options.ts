import { GenerateOptions } from '../../types/index.js';
import { generateOptionsSchema } from './schemas/index.js';
import validate from './validate.js';
import { createSjwtValidationError } from '../error/index.js';

function validateGenerateOptions(options: GenerateOptions): void {
  validate(generateOptionsSchema, false, options, 'options');

  if (
    'secretKey' in options &&
    'privateKey' in options &&
    options.secretKey &&
    options.privateKey
  ) {
    throw createSjwtValidationError(
      '"secretKey" and "privateKey" cannot both be provided',
    );
  }

  if (!('secretKey' in options) && !('privateKey' in options)) {
    throw createSjwtValidationError(
      '"secretKey" or "privateKey" must be provided',
    );
  }
}

export default validateGenerateOptions;
