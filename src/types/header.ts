import { Algorithm } from './algorithm.js';

export interface Header {
  alg: Algorithm;
  typ: 'JWT';
}
