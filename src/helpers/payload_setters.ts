import ms from 'ms';
import { createSjwtValidationError } from '../utils/error/index.js';
import { Payload, GenerateOptions } from '../types/index.js';

export function setIat(
  payload: Payload,
  options: GenerateOptions,
  issuedAtTime: number,
): Payload {
  const { noTimestamp } = options;
  const { iat } = payload;
  const newPayload = { ...payload };

  if (!noTimestamp && iat === undefined) {
    newPayload.iat = issuedAtTime;
  } else if (noTimestamp && iat) {
    throw createSjwtValidationError(
      'You cannot set the "iat" claim when the "noTimestamp" option is set to "true".',
    );
  }

  return newPayload;
}

export function setExp(
  payload: Payload,
  options: GenerateOptions,
  issuedAtTime: number,
): Payload {
  const { expiresIn } = options;
  const newPayload = { ...payload };

  if (expiresIn !== undefined) {
    if (typeof expiresIn === 'string') {
      newPayload.exp = issuedAtTime + ms(expiresIn) / 1000;
    } else {
      newPayload.exp = issuedAtTime + expiresIn;
    }
  }

  return newPayload;
}

export function setAud(payload: Payload, options: GenerateOptions): Payload {
  const { audience } = options;
  const newPayload = { ...payload };

  if (audience !== undefined) {
    if (typeof audience === 'string') {
      newPayload.aud = audience;
    } else if (Array.isArray(audience)) {
      newPayload.aud = audience.join(' ');
    }
  }

  return newPayload;
}

export function setIss(payload: Payload, options: GenerateOptions): Payload {
  const { issuer } = options;
  const newPayload = { ...payload };

  if (issuer !== undefined) {
    newPayload.iss = issuer;
  }

  return newPayload;
}

export function setSub(payload: Payload, options: GenerateOptions): Payload {
  const { subject } = options;
  const newPayload = { ...payload };

  if (subject !== undefined) {
    newPayload.sub = subject;
  }

  return newPayload;
}

export function setJti(payload: Payload, options: GenerateOptions): Payload {
  const { jwtId } = options;
  const newPayload = { ...payload };

  if (jwtId !== undefined) {
    newPayload.jti = jwtId;
  }

  return newPayload;
}
