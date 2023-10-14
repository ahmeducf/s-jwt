import crypto, { KeyObject } from 'crypto';
import { generateSync } from '../src/index.js';
import { Payload, GenerateOptions } from '../src/types/index.js';
import { ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG } from '../src/constants.js';

let PRIVATE_KEY_KEYOBJECT: KeyObject;
let PRIVATE_KEY_STRING: string;
let PRIVATE_KEY_BUFFER: Buffer;

beforeAll(() => {
  const keyPair = crypto.generateKeyPairSync('ec', {
    namedCurve: 'prime256v1',
  });
  PRIVATE_KEY_KEYOBJECT = keyPair.privateKey;
  PRIVATE_KEY_STRING = keyPair.privateKey.export({
    format: 'pem',
    type: 'pkcs8',
  }) as string;

  PRIVATE_KEY_BUFFER = Buffer.from(PRIVATE_KEY_STRING);
});

describe('generate token with ECDSA algorithm', () => {
  it('should return a jwt string with privateKey of type string', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'ES256',
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
      algorithm: 'ES256',
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
      algorithm: 'ES256',
      privateKey: PRIVATE_KEY_KEYOBJECT,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should throw an error with invalid privateKey', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'ES256',
      privateKey: 'invalid',
    };

    expect(() => generateSync(payload, options)).toThrow(
      ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
    );
  });

  it('should generate a token with ES384 algorithm', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'ES384',
      privateKey: PRIVATE_KEY_STRING,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should generate a token with ES512 algorithm', () => {
    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'ES512',
      privateKey: PRIVATE_KEY_STRING,
    };

    const jwtToken = generateSync(payload, options);

    expect(jwtToken).toMatch(/^.*\..*\..*$/);
  });

  it('should throw error if privateKey is not of type ECDSA', () => { 
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const payload: Payload = {
      iss: 'test',
      exp: 1234567890,
      iat: 1234567890,
      test: 'test',
    };
    const options: GenerateOptions = {
      algorithm: 'ES256',
      privateKey: keyPair.privateKey,
    };

    expect(() => generateSync(payload, options)).toThrowError(
      ECDSA_PRIVATE_KEY_INVALID_ERROR_MSG,
    );
  });
});
