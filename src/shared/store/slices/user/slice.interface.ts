import type { User } from '@shared/api';
import type { Nullable } from '@shared/types';

export interface Slice {
  user: Nullable<User>;
}
