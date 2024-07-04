import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { Ingredient } from '@shared/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  ingredients: [],
};

const setList: CaseReducer<Slice, PayloadAction<Ingredient[]>> = (
  state,
  action,
) => {
  state.ingredients = action.payload;
};

const clearList: CaseReducer<Slice> = (state) => {
  state.ingredients = [];
};

const slice = createSlice({
  name: sliceNames.ingredients,
  initialState,
  reducers: {
    set: setList,
    clear: clearList,
  },
});

const { set, clear } = slice.actions;

export const ingredientsActions: typeof slice.actions = { set, clear };

export const { reducer: ingredientsReducer } = slice;
