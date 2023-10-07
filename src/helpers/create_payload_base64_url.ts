import { Payload, GenerateOptions } from '../types/index.js';
import {
  setIat,
  setExp,
  setAud,
  setIss,
  setSub,
  setJti,
} from './payload_setters.js';
import base64url from '../utils/base64url/index.js';

export function createPayloadBase64Url(
  payload: Payload,
  options: GenerateOptions,
): string {
  const issueTime = Math.floor(Date.now() / 1000);
  
  let PayloadObject: Payload = { ...payload };

  PayloadObject = setIat(PayloadObject, options, issueTime);
  PayloadObject = setExp(PayloadObject, options, issueTime);
  PayloadObject = setAud(PayloadObject, options);
  PayloadObject = setIss(PayloadObject, options);
  PayloadObject = setSub(PayloadObject, options);
  PayloadObject = setJti(PayloadObject, options);

  const payloadJsonString = JSON.stringify(PayloadObject);
  const payloadBase64Url = base64url.encode(payloadJsonString);

  return payloadBase64Url;
}

export default createPayloadBase64Url;
