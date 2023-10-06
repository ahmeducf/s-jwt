import { ValidationSchema, Validator } from '../../../types';
import { isString, isValidSecondsNumber } from '../validators_predicates';

const issValidator: Validator = {
  isValid: isString,
  message: '"iss" must be a string',
};

const subValidator: Validator = {
  isValid: isString,
  message: '"sub" must be a string',
};

const audValidator: Validator = {
  isValid: isString,
  message: '"aud" must be a string',
};

const expValidator: Validator = {
  isValid: isValidSecondsNumber,
  message: '"exp" must be a positive integer',
};

const iatValidator: Validator = {
  isValid: isValidSecondsNumber,
  message: '"iat" must be a positive integer',
};

const jtiValidator: Validator = {
  isValid: isString,
  message: '"jti" must be a string',
};

export const payloadSchema: ValidationSchema = {
  iss: issValidator,
  sub: subValidator,
  aud: audValidator,
  exp: expValidator,
  iat: iatValidator,
  jti: jtiValidator,
};

export default payloadSchema;
