export interface Validator {
  isValid: (value: unknown) => boolean;
  message: string;
}

export interface ValidationSchema {
  [key: string]: Validator;
}
