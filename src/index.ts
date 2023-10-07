import { generate, generateSync } from './generate.js';
import { verify, verifySync } from './verify.js';

export * from './generate.js';
export * from './verify.js';
export * from './types/index.js';

export default {
  generate,
  generateSync,
  verify,
  verifySync,
};
