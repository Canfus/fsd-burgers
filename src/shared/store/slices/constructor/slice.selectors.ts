import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store.interface';

export const selectConstructor = createSelector(
  [(store: RootState) => store.constructorReducer.items],
  (constructor) => constructor,
);
