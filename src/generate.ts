import { Payload, GenerateOptions } from './types/index.js';
import {
  createHeaderBase64Url,
  createPayloadBase64Url,
  createJwtToken,
  getSecretOrPrivateKey,
} from './helpers/index.js';
import {
  validatePayload,
  validateGenerateOptions,
} from './utils/validation/index.js';

export function generateSync(
  payload: Payload,
  options: GenerateOptions,
): string {
  validatePayload(payload);
  validateGenerateOptions(options);

  const secretOrPrivateKey = getSecretOrPrivateKey(options);

  const headerBase64Url: string = createHeaderBase64Url(options.algorithm);
  const payloadBase64Url: string = createPayloadBase64Url(payload, options);

  const jwtToken: string = createJwtToken(
    headerBase64Url,
    payloadBase64Url,
    secretOrPrivateKey,
    options.algorithm,
  );

  return jwtToken;
}

export async function generate(
  payload: Payload,
  options: GenerateOptions,
): Promise<string> {
  return generateSync(payload, options);
}

export default {
  generate,
  generateSync,
}
