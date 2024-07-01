import { object } from 'zod';

import { validators } from '@shared/utils';

export const schema = object({
  name: validators.getStringOptionalValidationSchema(),
  email: validators.getStringOptionalValidationSchema(),
  password: validators.getStringOptionalValidationSchema(),
});

