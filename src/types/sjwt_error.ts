export interface SjwtError extends Error {
  name: string;
  message: string;
}

export type SjwtTypeError = SjwtError;
export type SjwtValidationError = SjwtError;
