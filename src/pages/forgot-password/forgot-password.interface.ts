import type { TypeOf } from 'zod';

import { schema } from './forgot-password.schema.ts';

export type Schema = TypeOf<typeof schema>;
