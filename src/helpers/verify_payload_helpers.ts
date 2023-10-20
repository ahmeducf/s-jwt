import ms from 'ms';
import { Payload, VerifyOptions } from '../types/index.js';
import {
  createSjwtTypeError,
  createSjwtVerificationError,
  createSjwtExpiredTokenError,
  createSjwtValidationError,
} from '../utils/error/index.js';

export function verifyExpiration(
  payload: Payload,
  options: VerifyOptions,
): void {
  const clockTimestamp =
    options.clockTimestamp ?? Math.floor(Date.now() / 1000);

  if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
    if (typeof payload.exp !== 'number') {
      throw createSjwtTypeError('number', typeof payload.exp);
    }

    if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
      throw createSjwtExpiredTokenError(
        'Expired token: jwt expired',
        new Date(payload.exp * 1000),
      );
    }
  }

  if (options.maxAge) {
    if (typeof payload.iat === 'undefined') {
      throw createSjwtValidationError(
        'iat required when maxAge is specified',
      );
    }

    if (typeof payload.iat !== 'number') {
      throw createSjwtTypeError('number', typeof payload.iat);
    }

    let maxAgeTimestamp: number;
    if (typeof options.maxAge === 'number') {
      maxAgeTimestamp = payload.iat + options.maxAge;
    } else {
      try {
        maxAgeTimestamp = payload.iat + ms(options.maxAge) / 1000;
      } catch (_) {
        throw createSjwtValidationError(
          'The maxAge option must be a number of seconds or string representing a timespan eg: "1d", "20h", 60',
        );
      }
    }

    if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
      throw createSjwtExpiredTokenError(
        'Expired token: jwt maxAge exceeded',
        new Date(maxAgeTimestamp * 1000),
      );
    }
  }
}

export function verifyIssuer(payload: Payload, options: VerifyOptions): void {
  if (options.issuer) {
    if (typeof payload.iss === 'undefined') {
      throw createSjwtValidationError(
        'jwt issuer missing from payload',
      );
    }

    if (typeof payload.iss !== 'string') {
      throw createSjwtTypeError('string', typeof payload.iss);
    }

    if (typeof options.issuer === 'string') {
      if (payload.iss !== options.issuer) {
        throw createSjwtVerificationError(
          'InvalidIssuer',
          `jwt issuer invalid. expected: ${options.issuer}`,
        );
      }
    } else if (!options.issuer.includes(payload.iss)) {
      throw createSjwtVerificationError(
        'InvalidIssuer',
        `jwt issuer invalid. expected one from: [${options.issuer.join(', ')}]`,
      );
    }
  }
}

export function verifySubject(payload: Payload, options: VerifyOptions): void {
  if (options.subject) {
    if (typeof payload.sub === 'undefined') {
      throw createSjwtValidationError(
        'jwt subject missing from payload',
      );
    }

    if (typeof payload.sub !== 'string') {
      throw createSjwtTypeError('string', typeof payload.sub);
    }

    if (payload.sub !== options.subject) {
      throw createSjwtVerificationError(
        'InvalidSubject',
        `jwt subject invalid. expected: ${options.subject}`,
      );
    }
  }
}

export function verifyAudience(payload: Payload, options: VerifyOptions): void {
  if (options.audience) {
    if (typeof payload.aud === 'undefined') {
      throw createSjwtValidationError(
        'jwt audience missing from payload',
      );
    }

    if (typeof payload.aud !== 'string' && !Array.isArray(payload.aud)) {
      throw createSjwtTypeError('string or array of strings', typeof payload.aud);
    }

    const audiences = Array.isArray(options.audience)
      ? options.audience
      : [options.audience];
    const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];

    const isMatch = (): boolean => {
      let match = false;
      target.forEach((targetAudience) => {
        audiences.forEach((audience) => {
          if (audience instanceof RegExp && audience.test(targetAudience)) {
            match = true;
          }

          if (audience === targetAudience) {
            match = true;
          }
        });
      });

      return match;
    };

    if (!isMatch()) {
      throw createSjwtVerificationError(
        'InvalidAudience',
        'jwt audience invalid',
      );
    }
  }
}

export function verifyJwtId(payload: Payload, options: VerifyOptions): void {
  if (options.jwtId) {
    if (typeof payload.jti === 'undefined') {
      throw createSjwtValidationError(
        'jwt jwtId missing from payload',
      );
    }

    if (typeof payload.jti !== 'string') {
      throw createSjwtTypeError('string', typeof payload.jti);
    }

    if (payload.jti !== options.jwtId) {
      throw createSjwtVerificationError(
        'InvalidJwtId',
        `jwt jwtId invalid. expected: ${options.jwtId}`,
      );
    }
  }
}

export default {
  verifyExpiration,
  verifyIssuer,
  verifySubject,
  verifyAudience,
  verifyJwtId,
};
