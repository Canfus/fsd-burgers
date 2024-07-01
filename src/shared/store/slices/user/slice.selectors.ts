import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store.interface';

export const selectUser = createSelector(
  [(store: RootState) => store.user.user],
  (user) => user,
);
