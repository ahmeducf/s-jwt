import crypto from 'crypto';
import { validateGenerateOptions } from '../src/utils/validation/index.js';
import { GenerateOptions } from '../src/types/index.js';
import { ALGORITHMS } from '../src/constants.js';

describe('validateGenerateOptions', () => {
  it('should validate a valid options object', () => {
    const options: GenerateOptions = {
      secretKey: 'secret',
      algorithm: 'HS256',
      expiresIn: 300,
      audience: 'clientID',
      issuer: 'https://example.com',
      jwtId: 'jwtid',
      subject: 'subject',
      noTimestamp: true,
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should validate a valid options object with missing optional fields', () => {
    const options: GenerateOptions = {
      privateKey: 'secret',
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should throw an error if the options object is not an object', () => {
    const options = 'not an object';

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"options" must be a plain object',
    );
  });

  it('should throw an error if the options object is null', () => {
    const options = null;

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"options" must be a plain object',
    );
  });

  it('should throw an error if the options object is undefined', () => {
    const options = undefined;

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"options" must be a plain object',
    );
  });

  it('should throw an error if the options object is an array', () => {
    const options = ['an array'];

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"options" must be a plain object',
    );
  });

  it('should throw an error if missing required fields', () => {
    const options = {};

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"secretKey" or "privateKey" must be provided',
    );
  });

  it('should throw an error if both secretKey and privateKey are provided', () => {
    const options = {
      secretKey: 'secret',
      privateKey: 'secret',
    };

    expect(() => validateGenerateOptions(options)).toThrow(
      '"secretKey" and "privateKey" cannot both be provided',
    );
  });
});

describe('secretKey', () => {
  it('should validate with a valid secretKey buffer', () => {
    const options: GenerateOptions = {
      secretKey: Buffer.from('secret'),
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should validate with a valid secretKey KeyObject', () => {
    const options: GenerateOptions = {
      secretKey: crypto.createSecretKey('secret', 'utf8'),
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should throw an error if the secretKey is not a string, buffer, or KeyObject', () => {
    const options = {
      secretKey: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"secretKey" must be a string, buffer or keyObject',
    );
  });
});

describe('privateKey', () => {
  it('should validate with a valid privateKey buffer', () => {
    const options: GenerateOptions = {
      privateKey: Buffer.from('secret'),
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should validate with a valid privateKey KeyObject', () => {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const options: GenerateOptions = {
      privateKey: keypair.privateKey,
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should throw an error if the privateKey is not a string, buffer, or KeyObject', () => {
    const options = {
      privateKey: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"privateKey" must be a string, buffer or keyObject',
    );
  });
});

describe('algorithm', () => {
  it('should throw an error if the algorithm is not a valid algorithm', () => {
    const options = {
      secretKey: 'secret',
      algorithm: 'not an algorithm',
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      `"algorithm" must be a valid algorithm: ${ALGORITHMS.join(', ')}`,
    );
  });
});

describe('expiresIn', () => {
  it('should validate with a valid timespan string', () => {
    const options: GenerateOptions = {
      secretKey: 'secret',
      expiresIn: '1d',
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should throw an error if the expiresIn is not a valid number', () => {
    const options = {
      secretKey: 'secret',
      expiresIn: -1,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"expiresIn" must be a number of seconds or string representing a timespan',
    );
  });

  it('should throw an error if the expiresIn is not a valid timespan string', () => {
    const options: GenerateOptions = {
      secretKey: 'secret',
      expiresIn: 'not a valid timespan string',
    };

    expect(() => validateGenerateOptions(options)).toThrow(
      '"expiresIn" must be a number of seconds or string representing a timespan',
    );
  });
});

describe('audience', () => {
  it('should validate with a valid array of strings', () => {
    const options: GenerateOptions = {
      secretKey: 'secret',
      audience: ['clientID', 'clientID2'],
    };

    expect(() => validateGenerateOptions(options)).not.toThrow();
  });

  it('should throw an error if audience is not an array of strings', () => {
    const options = {
      secretKey: 'secret',
      audience: ['clientID', 1234567890],
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"audience" must be a string or an array of strings',
    );
  });

  it('should throw an error if the audience is not a string or array of strings', () => {
    const options = {
      secretKey: 'secret',
      audience: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"audience" must be a string or an array of strings',
    );
  });
});

describe('issuer', () => {
  it('should throw an error if the issuer is not a string', () => {
    const options = {
      secretKey: 'secret',
      issuer: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"issuer" must be a string',
    );
  });
});

describe('jwtId', () => {
  it('should throw an error if the jwtId is not a string', () => {
    const options = {
      secretKey: 'secret',
      jwtId: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"jwtId" must be a string',
    );
  });
});

describe('subject', () => {
  it('should throw an error if the subject is not a string', () => {
    const options = {
      secretKey: 'secret',
      subject: 1234567890,
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"subject" must be a string',
    );
  });
});

describe('noTimestamp', () => {
  it('should throw an error if the noTimestamp is not a boolean', () => {
    const options = {
      secretKey: 'secret',
      noTimestamp: 'not a boolean',
    };

    expect(() => validateGenerateOptions(options as never)).toThrow(
      '"noTimestamp" must be a boolean',
    );
  });
});
