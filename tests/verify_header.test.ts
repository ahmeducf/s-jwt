import { verifyHeader } from '../src/helpers/index.js';
import { Header, VerifyOptions } from '../src/types/index.js';

describe('verifyHeader', () => {
  it('should verify a valid header', () => { 
    const header: Header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      algorithms: ['HS256', 'HS384', 'HS512'],
    };

    expect(() => verifyHeader(header, options)).not.toThrow();
  });
  it('should throw an error if the token type is not JWT', () => {
    const header: Header = {
      alg: 'HS256',
      typ: 'NOT_JWT' as never,
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
    };

    expect(() => verifyHeader(header, options)).toThrow(
      'Token type is not JWT',
    );
  });

  it('should throw an error if the algorithm is not included in the list of allowed algorithms', () => {
    const header: Header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const options: VerifyOptions = {
      secretKey: 'secret',
      algorithms: ['HS384'],
    };

    expect(() => verifyHeader(header, options)).toThrow(
      'Algorithm HS256 is not included in the list of allowed "algorithms" HS384',
    );
  });
});