import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store.interface';

export const selectOrderList = createSelector(
  [(store: RootState) => store.orderListReducer.orders],
  (orders) => orders,
);

