import { Algorithm } from './algorithm';

export interface Header {
  alg: Algorithm;
  typ: 'JWT';
}
