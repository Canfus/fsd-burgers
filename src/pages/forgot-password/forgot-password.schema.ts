import { object } from 'zod';

import { validators } from '@shared/utils';

export const schema = object({
  email: validators.getStringEmailValidationSchema('Введите корректный email'),
});
