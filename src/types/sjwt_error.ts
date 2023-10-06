interface SjwtError {
  name: string;
  message: string;
}

export type SjwtTypeError = SjwtError & Error;
export type SjwtValidationError = SjwtError & Error;
