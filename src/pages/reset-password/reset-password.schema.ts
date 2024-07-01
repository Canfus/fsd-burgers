import { object } from 'zod';

import { validators } from '@shared/utils';

export const schema = object({
  password: validators.getStringPasswordValidationSchema(),
  token: validators.getStringRequiredValidationSchema(),
});
