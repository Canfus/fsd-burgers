import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { Ingredient } from '@shared/api';
import { isArrayEmpty } from '@shared/utils';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  items: [],
};

const updateList: CaseReducer<Slice, PayloadAction<Ingredient[]>> = (
  state,
  action,
) => {
  const updatedPayload = [state.items[0], ...action.payload];

  state.items = updatedPayload;
};

const clearList: CaseReducer<Slice> = (state) => {
  state.items = [];
};

const appendItem: CaseReducer<Slice, PayloadAction<Ingredient>> = (
  state,
  action,
) => {
  if (action.payload.type !== 'bun' && !isArrayEmpty(state.items)) {
    state.items = [...state.items, action.payload];
  }
  if (action.payload.type === 'bun') {
    state.items = [action.payload, ...state.items.slice(1)];
  }
};

const removeItem: CaseReducer<Slice, PayloadAction<string>> = (
  state,
  action,
) => {
  const updatedPayload = state.items.filter(
    (ingredient) => ingredient._id !== action.payload,
  );

  state.items = updatedPayload;
};

const slice = createSlice({
  name: sliceNames.constructorItems,
  initialState,
  reducers: {
    append: appendItem,
    clear: clearList,
    remove: removeItem,
    update: updateList,
  },
});

const { append, clear, remove, update } = slice.actions;

export const constructorActions: typeof slice.actions = {
  append,
  clear,
  remove,
  update,
};

export const { reducer: constructorReducer } = slice;