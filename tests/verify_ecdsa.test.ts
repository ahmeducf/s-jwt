import crypto from 'crypto';
import { generateSync, verifySync } from '../src/index.js';
import { Payload, GenerateOptions, VerifyOptions } from '../src/types/index.js';
import { HMAC_ALGORITHMS, ECDSA_ALGORITHMS } from '../src/constants.js';

let PAYLOAD: Payload;
let GENERATE_OPTIONS: GenerateOptions;
let ECDSA_KEY_PAIR: crypto.KeyPairKeyObjectResult;
beforeAll(() => {
  PAYLOAD = {
    iss: 'test',
    exp: Date.now() + 1000,
    iat: Date.now(),
    test: 'test',
  };
  ECDSA_KEY_PAIR = crypto.generateKeyPairSync('ec', {
    namedCurve: 'prime256v1',
  });
  GENERATE_OPTIONS = {
    privateKey: ECDSA_KEY_PAIR.privateKey,
  };
});

describe('verify token with ECDSA algorithm', () => {
  it('should return payload in JSON format if the token is valid', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as Buffer', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey.export({
        format: 'pem',
        type: 'spki',
      }),
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as KeyObject', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with sha384 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'ES384';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with sha512 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'ES512';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should throw an error if verification publickey does not match generation privatekey', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.generateKeyPairSync('ec', {
        namedCurve: 'prime256v1',
      }).publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrowError('signature verification failed');
  });

  it('should throw an error if secret key is assigned instead of public key', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.createSecretKey(Buffer.from('test')),
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrowError(
      '"publicKey" must be a public key material for asymmetric algorithms',
    );
  });

  it('should throw an error if verification happens with secret key', () => {
    GENERATE_OPTIONS.algorithm = 'ES256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
      algorithms: ECDSA_ALGORITHMS,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrowError(
      `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if jwt token is invalid', () => {
    const generateOptions: GenerateOptions = {
      algorithm: 'HS256',
      secretKey: 'test',
    };
    const jwtToken = generateSync(PAYLOAD, generateOptions);
    const verifyOptions: VerifyOptions = {
      publicKey: ECDSA_KEY_PAIR.publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrowError(
      `Algorithm HS256 is not included in the list of allowed "algorithms" ${ECDSA_ALGORITHMS.join(
        ', ',
      )}`,
    );
  });
});
