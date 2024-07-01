import type { TypeOf } from 'zod';

import { schema } from './reset-password.schema.ts';

export type Schema = TypeOf<typeof schema>;
