import type { TypeOf } from 'zod';

import { schema } from './login.schema';

export type Schema = TypeOf<typeof schema>;
