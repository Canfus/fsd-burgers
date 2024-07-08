import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { OrderItem } from '@shared/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  orders: [],
};

const setList: CaseReducer<Slice, PayloadAction<OrderItem[]>> = (
  state,
  action,
) => {
  state.orders = action.payload.reverse();
};

const clearList: CaseReducer<Slice> = (state) => {
  state.orders = [];
};

const slice = createSlice({
  name: sliceNames.orderList,
  initialState,
  reducers: {
    set: setList,
    clear: clearList,
  },
});

const { set, clear } = slice.actions;

export const orderListActions: typeof slice.actions = {
  set,
  clear,
};

export const { reducer: orderListReducer } = slice;
