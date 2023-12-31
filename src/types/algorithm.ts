export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512';

export type HmacAlgorithm = 'HS256' | 'HS384' | 'HS512';
export type RsaAlgorithm = 'RS256' | 'RS384' | 'RS512';
export type PssAlgorithm = 'PS256' | 'PS384' | 'PS512';
export type EcdsaAlgorithm = 'ES256' | 'ES384' | 'ES512';
export type AsymmetricKeyAlgorithm =
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'ES256'
  | 'ES384'
  | 'ES512';
