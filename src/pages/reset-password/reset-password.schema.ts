import { object } from 'zod';

import { validators } from '@shared/utils';

export const schema = object({
  password: validators.getStringPasswordValidationSchema(),
  repeatPassword: validators.getStringPasswordValidationSchema(),
  token: validators.getStringRequiredValidationSchema(),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: 'Пароли не совпадают',
  path: ['repeatPassword'],
});
