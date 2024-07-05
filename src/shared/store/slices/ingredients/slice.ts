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
  selectedIngredient: null,
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

const selectIngredient: CaseReducer<Slice, PayloadAction<Ingredient>> = (
  state,
  action,
) => {
  state.selectedIngredient = action.payload;
};

const removeSelected: CaseReducer<Slice> = (state) => {
  state.selectedIngredient = null;
};

const slice = createSlice({
  name: sliceNames.ingredients,
  initialState,
  reducers: {
    set: setList,
    clear: clearList,
    select: selectIngredient,
    remove: removeSelected,
  },
});

const { set, clear, select, remove } = slice.actions;

export const ingredientsActions: typeof slice.actions = {
  set,
  clear,
  select,
  remove,
};

export const { reducer: ingredientsReducer } = slice;
