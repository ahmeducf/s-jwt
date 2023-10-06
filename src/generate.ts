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

async function generate(
  payload: Payload,
  options: GenerateOptions,
): Promise<string> {
  validatePayload(payload);
  validateGenerateOptions(options);

  const secretOrPrivateKey = getSecretOrPrivateKey(options);

  const headerBase64Url: string = createHeaderBase64Url(options.algorithm);
  const payloadBase64Url: string = createPayloadBase64Url(payload, options);

  const jwtToken: string = await createJwtToken(
    headerBase64Url,
    payloadBase64Url,
    secretOrPrivateKey,
    options.algorithm,
  );

  return jwtToken;
}

export default generate;
