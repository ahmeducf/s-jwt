import crypto from 'crypto';
import { getSecretOrPrivateKey } from '../src/helpers/index.js';
import { GenerateOptions } from '../src/types/index.js';

describe('getSecretOrPrivateKey', () => {
  it('should return the secretKey if provided', () => {
    const options: GenerateOptions = {
      secretKey: 'secret',
    };

    const secretOrPrivateKey = getSecretOrPrivateKey(options);

    expect(secretOrPrivateKey).toBe('secret');
  });

  it('should return the privateKey if provided', () => {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const options: GenerateOptions = {
      privateKey: keypair.privateKey,
    };

    const secretOrPrivateKey = getSecretOrPrivateKey(options);

    expect(secretOrPrivateKey).toBe(keypair.privateKey);
  });

  it('should throw an error if neither secretKey nor privateKey is provided', () => {
    const options = {};

    expect(() => getSecretOrPrivateKey(options as never)).toThrow(
      '"secretKey" or "privateKey" must be provided',
    );
  });

  it('should throw an error if both secretKey and privateKey are provided', () => {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const options: GenerateOptions = {
      secretKey: 'secret',
      privateKey: keypair.privateKey,
    };

    expect(() => getSecretOrPrivateKey(options)).toThrow(
      '"secretKey" and "privateKey" cannot both be provided',
    );
  });

  it('should throw an error if options is not a plain object', () => {
    const options = 'options';

    expect(() => getSecretOrPrivateKey(options as never)).toThrow(
      '"options" must be a plain object',
    );
  });
});
