import crypto from 'crypto';
import { generateSync, verifySync } from '../src/index.js';
import { Payload, GenerateOptions, VerifyOptions } from '../src/types/index.js';
import { RSA_ALGORITHMS, HMAC_ALGORITHMS } from '../src/constants.js';

let PAYLOAD: Payload;
let GENERATE_OPTIONS: GenerateOptions;
let RSA_KEY_PAIR: crypto.KeyPairKeyObjectResult;
beforeAll(() => {
  PAYLOAD = {
    iss: 'test',
    exp: Date.now() + 1000,
    iat: Date.now(),
    test: 'test',
  };
  RSA_KEY_PAIR = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  GENERATE_OPTIONS = {
    privateKey: RSA_KEY_PAIR.privateKey,
  };
});

describe('verify token with RSA algorithm', () => {
  it('should return payload in JSON format if the token is valid', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as Buffer', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey.export({
        format: 'pem',
        type: 'spki',
      }),
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as KeyObject', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with RS384 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'RS384';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with RS512 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'RS512';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should throw an error if public key does not match private key', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      }).publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow('signature verification failed');
  });

  it('should throw an error if secret key is assigned instead of public key', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.createSecretKey(Buffer.from('test')),
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      '"publicKey" must be a public key material for asymmetric algorithms',
    );
  });

  it('should throw an error is if verification happens with secret key', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
      algorithms: RSA_ALGORITHMS,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if jwt token is invalid', () => {
    const generateOptions: GenerateOptions = {
      secretKey: 'test',
      algorithm: 'HS256',
    };
    const jwtToken = generateSync(PAYLOAD, generateOptions);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `Algorithm HS256 is not included in the list of allowed "algorithms" ${RSA_ALGORITHMS.join(
        ', ',
      )}`,
    );
  });
});
