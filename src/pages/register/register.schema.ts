import { object } from 'zod';

import { validators } from '@shared/utils';

export const schema = object({
  name: validators.getStringRequiredValidationSchema(),
  email: validators.getStringEmailValidationSchema('Введите корректный email'),
  password: validators.getStringPasswordValidationSchema(),
});
