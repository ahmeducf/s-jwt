import crypto from 'crypto';
import { validateVerifyOptions } from '../src/utils/validation/index.js';
import { VerifyOptions } from '../src/types/index.js';
import {
  HMAC_ALGORITHMS,
  ECDSA_ALGORITHMS,
  RSA_ALGORITHMS,
  PSS_ALGORITHMS,
} from '../src/constants.js';

jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

let RSA_PUBLIC_KEY: crypto.KeyObject;
let RSA_PUBLIC_KEY_STRING: string;
let RSA_PUBLIC_KEY_BUFFER: Buffer;

beforeAll(() => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  RSA_PUBLIC_KEY = keyPair.publicKey;
  RSA_PUBLIC_KEY_STRING = RSA_PUBLIC_KEY.export({
    type: 'spki',
    format: 'pem',
  }) as string;
  RSA_PUBLIC_KEY_BUFFER = Buffer.from(RSA_PUBLIC_KEY_STRING);
});

let PSS_PUBLIC_KEY: crypto.KeyObject;

beforeAll(() => {
  const keyPair = crypto.generateKeyPairSync('rsa-pss', {
    modulusLength: 2048,
  });

  PSS_PUBLIC_KEY = keyPair.publicKey;
});

let EC_PUBLIC_KEY: crypto.KeyObject;

beforeAll(() => {
  const keyPair = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
  });

  EC_PUBLIC_KEY = keyPair.publicKey;
});

describe('validateVerifyOptions', () => {
  it('should validate a valid VerifyOptions object', () => {
    const options: VerifyOptions = {
      algorithms: ['HS256'],
      audience: 'https://example.com',
      clockTimestamp: 1234567890,
      clockTolerance: 10,
      ignoreExpiration: true,
      issuer: 'https://example.com',
      jwtId: 'jwtId',
      maxAge: 1000,
      subject: 'subject',
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if options is undefined', () => {
    expect(() => validateVerifyOptions(undefined as never)).toThrowError(
      'Options must be provided',
    );
  });

  it('should throw an error if options is not an object', () => {
    expect(() => validateVerifyOptions(123 as never)).toThrowError(
      'Expected type to be VerifyOptions, got number',
    );
  });
});

describe('validateSecretOrPublicKey', () => {
  it('should throw an error if secretKey and publicKey are both undefined', () => {
    const options: VerifyOptions = {} as never;

    expect(() => validateVerifyOptions(options)).toThrowError(
      '"secretKey" or "publicKey" must be provided',
    );
  });

  it('should throw an error if secretKey and publicKey are both defined', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      publicKey: 'public',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      '"secretKey" and "publicKey" cannot both be provided',
    );
  });

  it('should validate a valid secretKey', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid secretKey as a Buffer', () => {
    const options: VerifyOptions = {
      secretKey: Buffer.from('secret'),
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid secretKey as a KeyObject', () => {
    const options: VerifyOptions = {
      secretKey: crypto.createSecretKey(Buffer.from('secret')),
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if secretKey is not a valid key material for symmetric algorithms', () => {
    const options: VerifyOptions = {
      secretKey: 1 as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      '"secretKey" is not a valid key material for symmetric algorithms',
    );
  });

  it('should throw an error if no algorithm matches the secretKey', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      algorithms: ['ES256'],
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      `SecretKey can only be used with supported HMAC algorithm [${HMAC_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should validate as algorithms and secretKey match', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      algorithms: ['HS256'],
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid publicKey', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid publicKey as a string', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY_STRING,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid publicKey as a Buffer', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY_BUFFER,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid publicKey as a KeyObject', () => {
    const options: VerifyOptions = {
      publicKey: crypto.createPublicKey(RSA_PUBLIC_KEY_STRING),
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if publicKey is not a valid key material for asymmetric algorithms', () => {
    const options: VerifyOptions = {
      publicKey: 'invalid' as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      '"publicKey" is not a valid key material for asymmetric algorithms',
    );
  });

  it('should validate as algorithms and publicKey match', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY,
      algorithms: ['RS256'],
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if no algorithm matches the RSA publicKey', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY,
      algorithms: ['HS256'],
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      `PublicKey of asymmetric key type "${
        RSA_PUBLIC_KEY.asymmetricKeyType
      }" can only be used with supported asymmetric key algorithm [${RSA_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if no algorithm matches the PSS publicKey', () => {
    const options: VerifyOptions = {
      publicKey: PSS_PUBLIC_KEY,
      algorithms: ['RS256'],
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      `PublicKey of asymmetric key type "${
        PSS_PUBLIC_KEY.asymmetricKeyType
      }" can only be used with supported asymmetric key algorithm [${PSS_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });

  it('should throw an error if no algorithm matches the EC publicKey', () => {
    const options: VerifyOptions = {
      publicKey: EC_PUBLIC_KEY,
      algorithms: ['RS256'],
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      `PublicKey of asymmetric key type "${
        EC_PUBLIC_KEY.asymmetricKeyType
      }" can only be used with supported asymmetric key algorithm [${ECDSA_ALGORITHMS.join(
        ', ',
      )}]`,
    );
  });
});

describe('validateAlgorithms', () => {
  it('should validate a valid algorithms array', () => {
    const options: VerifyOptions = {
      algorithms: ['HS256'],
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if algorithms array is empty', () => {
    const options: VerifyOptions = {
      algorithms: [],
      secretKey: 'secret',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'Algorithms array must contain at least one algorithm',
    );
  });

  it('should throw an error if if algorithms array contains an invalid algorithm', () => {
    const options: VerifyOptions = {
      algorithms: ['invalid'] as never,
      secretKey: 'secret',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'Expected type to be Algorithm, got string',
    );
  });

  it('should throw an error if algorithms is not an array', () => {
    const options: VerifyOptions = {
      algorithms: {} as never,
      secretKey: 'secret',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'Expected type to be Algorithms, got object',
    );
  });

  it('should assign HMAC algorithms if secretKey is provided and algorithms is undefined', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options).algorithms).toEqual(HMAC_ALGORITHMS);
  });

  it('should assign RSA algorithms if publicKey is provided and algorithms is undefined', () => {
    const options: VerifyOptions = {
      publicKey: RSA_PUBLIC_KEY,
    };

    expect(validateVerifyOptions(options).algorithms).toEqual(RSA_ALGORITHMS);
  });

  it('should assign PSS algorithms if publicKey is provided and algorithms is undefined', () => {
    const options: VerifyOptions = {
      publicKey: PSS_PUBLIC_KEY,
    };

    expect(validateVerifyOptions(options).algorithms).toEqual(PSS_ALGORITHMS);
  });

  it('should assign ECDSA algorithms if publicKey is provided and algorithms is undefined', () => {
    const options: VerifyOptions = {
      publicKey: EC_PUBLIC_KEY,
    };

    expect(validateVerifyOptions(options).algorithms).toEqual(ECDSA_ALGORITHMS);
  });
});

describe('validateAudience', () => {
  it('should validate a valid audience', () => {
    const options: VerifyOptions = {
      audience: 'https://example.com',
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate an array of valid audiences', () => {
    const options: VerifyOptions = {
      audience: ['https://example.com', 'https://example.org'],
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid audience as a RegExp', () => {
    const options: VerifyOptions = {
      audience: /https:\/\/example\.(com|org)/,
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if audience is not a string, RegExp, nor array of strings or RegExps', () => {
    const options: VerifyOptions = {
      audience: 1 as never,
      secretKey: 'secret',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.audience must be a string, a RegExp or an array of strings and/or RegExp',
    );
  });

  it('should throw an error if audience array contains non string/RegExp', () => {
    const options: VerifyOptions = {
      audience: [1] as never,
      secretKey: 'secret',
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.audience must be a string, a RegExp or an array of strings and/or RegExp',
    );
  });
});

describe('validateIssuer', () => {
  it('should validate a valid issuer', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 'https://example.com',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate an array of valid issuers', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: ['https://example.com', 'https://example.org'],
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if issuer is not a string nor an array of strings', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      issuer: 1 as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.issuer must be a string or an array of strings',
    );
  });
});

describe('validateJwtId', () => {
  it('should validate a valid jwtId', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 'jwtId',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if jwtId is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      jwtId: 1 as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.jwtId must be a string',
    );
  });
});

describe('validateSubject', () => {
  it('should validate a valid subject', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 'subject',
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if subject is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      subject: 1 as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.subject must be a string',
    );
  });
});

describe('validateIgnoreExpiration', () => {
  it('should validate a valid ignoreExpiration', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      ignoreExpiration: true,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if ignoreExpiration is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      ignoreExpiration: 1 as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.ignoreExpiration must be a boolean',
    );
  });
});

describe('validateClockTolerance', () => {
  it('should validate a valid clockTolerance', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTolerance: 10,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if clockTolerance is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTolerance: '10' as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.clockTolerance must be a positive integer representing seconds',
    );
  });
});

describe('validateClockTolerance', () => {
  it('should validate a valid clockTolerance', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTolerance: 10,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should throw an error if clockTolerance is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTolerance: '10' as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.clockTolerance must be a positive integer representing seconds',
    );
  });
});

describe('validateClockTimestamp', () => {
  it('should validate a valid clockTimestamp', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTimestamp: 1234567890,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should set clockTimestamp to current time if it is undefined', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(validateVerifyOptions(options)).toEqual({
      ...options,
      clockTimestamp: 1234567890,
    });
  });

  it('should throw an error if clockTimestamp is not a string', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      clockTimestamp: '1234567890' as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.clockTimestamp must be a positive integer representing seconds',
    );
  });
});

describe('validateMaxAge', () => {
  it('should validate a valid maxAge number', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: 1000,
    };

    expect(validateVerifyOptions(options)).toEqual(options);
  });

  it('should validate a valid maxAge string and convert it to seconds number', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: '1m',
    };

    expect(validateVerifyOptions(options)).toEqual({
      ...options,
      maxAge: 60,
    });
  });

  it('should throw an error if maxAge is not a string nor a number', () => {
    const options: VerifyOptions = {
      secretKey: 'secret',
      maxAge: {} as never,
    };

    expect(() => validateVerifyOptions(options)).toThrowError(
      'VerifyOptions.maxAge must be a positive integer representing seconds or a timespan string',
    );
  });
});
