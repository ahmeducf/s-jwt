import crypto, { KeyObject } from 'crypto';
import { generateSync } from '../src/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';
import {
  RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
  HMAC_ALGORITHMS,
} from '../src/constants.js';

let PRIVATE_KEY_KEYOBJECT: KeyObject;
let PRIVATE_KEY_STRING: string;
let PRIVATE_KEY_BUFFER: Buffer;

beforeAll(() => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  PRIVATE_KEY_KEYOBJECT = keyPair.privateKey;
  PRIVATE_KEY_STRING = keyPair.privateKey.export({
    format: 'pem',
    type: 'pkcs1',
  }) as string;

  PRIVATE_KEY_BUFFER = Buffer.from(PRIVATE_KEY_STRING);
});

describe('generate token with RSA algorithm', () => {
  it('should return a jwt string with privateKey of type string', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS256',
      privateKey: PRIVATE_KEY_STRING,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should return a jwt string with privateKey of type Buffer', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS256',
      privateKey: PRIVATE_KEY_BUFFER,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should return a jwt string with privateKey of type KeyObject', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS256',
      privateKey: PRIVATE_KEY_KEYOBJECT,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should throw an error when privateKey is invalid', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS256',
      privateKey: 'invalid',
    };

    expect(() => generateSync(payload, options)).toThrowError(
      RSA_PRIVATE_KEY_INVALID_ERROR_MSG,
    );
  });

  it('should throw an error when secretKey is provided instead of privateKey', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS256',
      secretKey: 'test',
    };

    expect(() => generateSync(payload, options)).toThrowError(
      `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should generate a token even with ecdsa privateKey', () => {
    const keyPair = crypto.generateKeyPairSync('ec', {
      namedCurve: 'prime256v1',
    });

    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };

    const options: GenerateOptions = {
      algorithm: 'RS256',
      privateKey: keyPair.privateKey,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });
});

describe('generate token with RSA-sha384 algorithm', () => {
  it('should return a jwt string with privateKey of type string', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS384',
      privateKey: PRIVATE_KEY_STRING,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });
});

describe('generate token with RSA-sha512 algorithm', () => {
  it('should return a jwt string with privateKey of type string', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'RS512',
      privateKey: PRIVATE_KEY_STRING,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });
});
