import { ValidationSchema, Validator } from '../../../types';
import { ALGORITHMS } from '../../../constants';
import {
  isAlgorithm,
  isValidSecondsNumberOrTimespanString,
  isString,
  isValidAudience,
  isBoolean,
  isValidSecretKey,
  isValidPrivateKey,
} from '../validators_predicates';

const algorithmValidator: Validator = {
  isValid: isAlgorithm,
  message: `"algorithm" must be a valid algorithm: ${ALGORITHMS.join(', ')}`,
};

const expiresInValidator: Validator = {
  isValid: isValidSecondsNumberOrTimespanString,
  message:
    '"expiresIn" must be a number of seconds or string representing a timespan',
};

const audienceValidator: Validator = {
  isValid: isValidAudience,
  message: '"audience" must be a string or an array of strings',
};

const issuerValidator: Validator = {
  isValid: isString,
  message: '"issuer" must be a string',
};

const jwtIdValidator: Validator = {
  isValid: isString,
  message: '"jwtId" must be a string',
};

const subjectValidator: Validator = {
  isValid: isString,
  message: '"subject" must be a string',
};

const noTimestampValidator: Validator = {
  isValid: isBoolean,
  message: '"noTimestamp" must be a boolean',
};

const secretKeyValidator: Validator = {
  isValid: isValidSecretKey,
  message: '"secretKey" must be a string, buffer or keyObject',
};

const privateKeyValidator: Validator = {
  isValid: isValidPrivateKey,
  message: '"privateKey" must be a string, buffer or keyObject',
};

export const generateOptionsSchema: ValidationSchema = {
  algorithm: algorithmValidator,
  expiresIn: expiresInValidator,
  audience: audienceValidator,
  issuer: issuerValidator,
  jwtId: jwtIdValidator,
  subject: subjectValidator,
  noTimestamp: noTimestampValidator,
  secretKey: secretKeyValidator,
  privateKey: privateKeyValidator,
};

export default generateOptionsSchema;
