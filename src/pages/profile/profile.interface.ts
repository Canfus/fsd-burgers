import type { TypeOf } from 'zod';

import { schema } from './profile.schema';

export type Schema = TypeOf<typeof schema>;

