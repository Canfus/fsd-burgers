import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { OrderItem, OrderListResponse } from '@shared/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  orders: [],
  total: null,
  totalToday: null,
};

const setList: CaseReducer<Slice, PayloadAction<OrderItem[]>> = (
  state,
  action,
) => {
  state.orders = action.payload.reverse();
};

const setTotalOrders: CaseReducer<Slice, PayloadAction<OrderListResponse>> = (
  state,
  action,
) => {
  state.total = action.payload.total;
  state.totalToday = action.payload.totalToday;
};

const clearList: CaseReducer<Slice> = (state) => {
  state.orders = [];
  state.total = null;
  state.totalToday = null;
};

const slice = createSlice({
  name: sliceNames.orderList,
  initialState,
  reducers: {
    set: setList,
    setTotal: setTotalOrders,
    clear: clearList,
  },
});

const { set, clear, setTotal } = slice.actions;

export const orderListActions: typeof slice.actions = {
  set,
  clear,
  setTotal,
};

export const { reducer: orderListReducer } = slice;
