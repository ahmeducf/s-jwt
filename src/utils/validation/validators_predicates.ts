import ms from 'ms';
import { KeyObject } from 'crypto';
import {
  Algorithm,
  HmacAlgorithm,
  AsymmetricKeyAlgorithm,
} from '../../types/index.js';
import {
  ALGORITHMS,
  HMAC_ALGORITHMS,
  ASYMMETRIC_KEY_ALGORITHMS,
} from '../../constants.js';

export function isPlainObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export const isAlgorithm = (value: unknown): value is Algorithm => {
  const algorithm: string = value as string;

  return ALGORITHMS.includes(algorithm.toUpperCase() as Algorithm);
};

export function isHmacAlgorithm(value: Algorithm): value is HmacAlgorithm {
  const algorithm: string = value as string;
  return HMAC_ALGORITHMS.includes(algorithm.toUpperCase() as Algorithm);
}

export function isAsymmetricKeyAlgorithm(
  value: Algorithm,
): value is AsymmetricKeyAlgorithm {
  const algorithm: string = value as string;
  return ASYMMETRIC_KEY_ALGORITHMS.includes(
    algorithm.toUpperCase() as Algorithm,
  );
}

export const isValidSecondsNumber = (value: unknown): boolean =>
  typeof value === 'number' && value > 0;

export const isValidTimespanString = (value: unknown): boolean =>
  typeof value === 'string' && !!value && !Number.isNaN(Number(ms(value)));

export const isValidSecondsNumberOrTimespanString = (value: unknown): boolean =>
  isValidSecondsNumber(value) || isValidTimespanString(value);

export const isArrayOfStrings = (value: unknown): boolean =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isValidAudience = (value: unknown): boolean =>
  isString(value) || isArrayOfStrings(value);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export const isBuffer = (value: unknown): value is Buffer =>
  Buffer.isBuffer(value);

export const isKeyObject = (value: unknown): value is KeyObject =>
  value instanceof KeyObject;

export const isValidSecretKey = (value: unknown): boolean =>
  isString(value) ||
  isBuffer(value) ||
  (isKeyObject(value) && value.type === 'secret');

export const isValidPrivateKey = (value: unknown): boolean =>
  isString(value) ||
  isBuffer(value) ||
  (isKeyObject(value) && value.type === 'private');

export const isValidPublicKey = (value: unknown): boolean =>
  isString(value) ||
  isBuffer(value) ||
  (isKeyObject(value) && value.type === 'public');
