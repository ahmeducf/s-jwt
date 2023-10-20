import crypto from 'crypto';
import { generateSync, verifySync } from '../src/index.js';
import { Payload, GenerateOptions, VerifyOptions } from '../src/types/index.js';
import { HMAC_ALGORITHMS, RSA_ALGORITHMS } from '../src/constants.js';

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
  GENERATE_OPTIONS = {
    secretKey: 'test',
  };
  RSA_KEY_PAIR = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
});

describe('verify token with HMAC algorithm', () => {
  it('should return payload in JSON format if the token is valid', () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with secretKey as Buffer', () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: Buffer.from('test'),
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with secretKey as KeyObject', () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: crypto.createSecretKey(Buffer.from('test')),
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with sha384 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'HS384';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with sha512 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'HS512';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it("should throw an error if verification secretKey doesn't match generation secretKey", () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'invalid',
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow('signature verification failed');
  });

  it('should throw an error if public key is assigned instead of secret key', () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: RSA_KEY_PAIR.publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      '"secretKey" must be a secret key material for symmetric algorithms',
    );
  });

  it('should throw an error if verification happens with public key', () => {
    GENERATE_OPTIONS.algorithm = 'HS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: RSA_KEY_PAIR.publicKey,
      algorithms: ['HS256'],
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `PublicKey of asymmetric key type "rsa" can only be used with supported asymmetric key algorithm [${RSA_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if jwt token is invalid', () => {
    const generateOptions: GenerateOptions = {
      privateKey: RSA_KEY_PAIR.privateKey,
      algorithm: 'RS256',
    };
    const jwtToken = generateSync(PAYLOAD, generateOptions);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `Algorithm RS256 is not included in the list of allowed "algorithms" ${HMAC_ALGORITHMS.join(
        ', ',
      )}`,
    );
  });
});
