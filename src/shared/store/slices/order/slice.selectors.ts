import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store.interface';

export const selectOrder = createSelector(
  [(store: RootState) => store.orderReducer.order],
  (order) => order,
);

export const selectOrderDialogState = createSelector(
  [(store: RootState) => store.orderReducer.dialogState],
  (dialogState) => dialogState,
);

