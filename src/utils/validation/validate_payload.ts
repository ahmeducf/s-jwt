import { Payload } from '../../types';
import { payloadSchema } from './schemas/index.js';
import validate from './validate.js';

function validatePayload(payload: Payload): void {
  validate(payloadSchema, true, payload, 'payload');
}

export default validatePayload;
