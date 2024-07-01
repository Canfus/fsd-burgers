import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { User } from '@shared/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  user: null,
};

const setReducer: CaseReducer<Slice, PayloadAction<User>> = (state, action) => {
  state.user = action.payload;
};

const clearReducer: CaseReducer<Slice> = (state) => {
  state.user = null;
};

const slice = createSlice({
  name: sliceNames.user,
  initialState,
  reducers: {
    set: setReducer,
    clear: clearReducer,
  },
});

const { set, clear } = slice.actions;

export const userActions: typeof slice.actions = { set, clear };

export const { reducer: userReducer } = slice;
