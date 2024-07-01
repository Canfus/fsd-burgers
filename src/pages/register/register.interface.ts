import type { TypeOf } from 'zod';

import { schema } from './register.schema';

export type Schema = TypeOf<typeof schema>;
