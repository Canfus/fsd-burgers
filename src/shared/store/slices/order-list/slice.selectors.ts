import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../store.interface';

export const selectOrderList = createSelector(
  [(store: RootState) => store.orderListReducer.orders],
  (orders) => orders,
);

export const selectDoneOrders = createSelector(
  [(store: RootState) => store.orderListReducer.orders],
  (orders) => orders?.filter((order) => order.status === 'done'),
);
export const selectPendingOrders = createSelector(
  [(store: RootState) => store.orderListReducer.orders],
  (orders) => orders?.filter((order) => order.status === 'pending'),
);

export const selectTotalOrders = createSelector(
  [
    (store: RootState) => [
      store.orderListReducer.total,
      store.orderListReducer.totalToday,
    ],
  ],
  (total) => total,
);
