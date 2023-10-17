import crypto from 'crypto';
import { generateSync, verifySync } from '../src/index.js';
import { Payload, GenerateOptions, VerifyOptions } from '../src/types/index.js';
import { PSS_ALGORITHMS, HMAC_ALGORITHMS, RSA_ALGORITHMS } from '../src/constants.js';

let PAYLOAD: Payload;
let GENERATE_OPTIONS: GenerateOptions;
let PSS_KEY_PAIR: crypto.KeyPairKeyObjectResult;
beforeAll(() => {
  PAYLOAD = {
    iss: 'test',
    exp: Date.now() + 1000,
    iat: Date.now(),
    test: 'test',
  };
  PSS_KEY_PAIR = crypto.generateKeyPairSync('rsa-pss', {
    modulusLength: 2048,
  });
  GENERATE_OPTIONS = {
    privateKey: PSS_KEY_PAIR.privateKey,
  };
});

describe('verify token with RSA-PSS algorithm', () => {
  it('should return payload in JSON format if the token is valid', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as Buffer', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey.export({
        format: 'pem',
        type: 'spki',
      }),
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format if the token is valid with publicKey as KeyObject', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with PS384 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'PS384';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should return payload in JSON format with PS512 algorithm', () => {
    GENERATE_OPTIONS.algorithm = 'PS512';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey,
    };

    const result = verifySync(jwtToken, verifyOptions);

    expect(result).toEqual(PAYLOAD);
  });

  it('should throw an error if public key does not match private key', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.generateKeyPairSync('rsa-pss', {
        modulusLength: 2048,
      }).publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow('signature verification failed');
  });

  it('should throw an error if the token is invalid', () => {
    GENERATE_OPTIONS.algorithm = 'RS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: PSS_KEY_PAIR.publicKey,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `Algorithm RS256 is not included in the list of allowed "algorithms" ${PSS_ALGORITHMS.join(
        ', ',
      )}`,
    );
  });

  it('should throw an error is if verification happens with secret key', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      secretKey: 'test',
      algorithms: PSS_ALGORITHMS,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if secret key is assigned instead of public key', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
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

  it('should throw an error if RSA public key is assigned instead of RSA-PSS public key', () => {
    GENERATE_OPTIONS.algorithm = 'PS256';
    const jwtToken = generateSync(PAYLOAD, GENERATE_OPTIONS);
    const verifyOptions: VerifyOptions = {
      publicKey: crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
      }).publicKey,
      algorithms: PSS_ALGORITHMS,
    };

    expect(() => {
      verifySync(jwtToken, verifyOptions);
    }).toThrow(
      `PublicKey of asymmetric key type "rsa" can only be used with supported asymmetric key algorithm [${RSA_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });
});
