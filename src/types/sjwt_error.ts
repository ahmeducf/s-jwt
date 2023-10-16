export interface SjwtError extends Error {
  name: string;
  message: string;
}

export type SjwtTypeError = SjwtError;
export type SjwtValidationError = SjwtError;
export type SjwtVerificationError = SjwtError;

export interface SjwtExpiredTokenError extends SjwtVerificationError {
  expiredAt: Date;
}