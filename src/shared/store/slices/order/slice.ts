import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { Order } from '@shared/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  order: null,
  dialogState: false,
};

const setOrder: CaseReducer<Slice, PayloadAction<Order>> = (state, action) => {
  state.order = action.payload;
  state.dialogState = true;
};

const clearOrder: CaseReducer<Slice> = (state) => {
  state.order = null;
  state.dialogState = false;
};

const slice = createSlice({
  name: sliceNames.order,
  initialState,
  reducers: {
    set: setOrder,
    clear: clearOrder,
  },
});

const { set, clear } = slice.actions;

export const orderActions: typeof slice.actions = {
  set,
  clear,
};

export const { reducer: orderReducer } = slice;

