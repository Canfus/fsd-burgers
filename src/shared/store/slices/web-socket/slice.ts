import {
  createSlice,
  type PayloadAction,
  type CaseReducer,
} from '@reduxjs/toolkit';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  status: 'disconnected',
  error: null,
  url: null,
};

const startConnecting: CaseReducer<Slice, PayloadAction<string>> = (
  state,
  action,
) => {
  state.status = 'connecting';
  state.url = action.payload;
  state.error = null;
};

const connecting: CaseReducer<Slice> = (state) => {
  state.status = 'connected';
};

const disconnecting: CaseReducer<Slice> = (state) => {
  state.status = 'disconnected';
  state.url = null;
};

const error: CaseReducer<Slice, PayloadAction<string>> = (state, action) => {
  state.status = 'error';
  state.error = action.payload;
};

const slice = createSlice({
  name: sliceNames.webSocket,
  initialState,
  reducers: {
    wsStartConnecting: startConnecting,
    wsConnecting: connecting,
    wsDisconnecting: disconnecting,
    wsError: error,
  },
});

const { wsStartConnecting, wsConnecting, wsDisconnecting, wsError } =
  slice.actions;

export const socketActions: typeof slice.actions = {
  wsStartConnecting,
  wsConnecting,
  wsDisconnecting,
  wsError,
};

export const { reducer: socketReducer } = slice;

