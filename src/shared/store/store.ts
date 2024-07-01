import {
  configureStore,
  combineReducers,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { reducerNames } from './store.constants';
import { resetStoreAction } from './actions';
import { createResetStoreMiddleware } from './middleware';
import { userReducer } from './slices';

const combinedReducer = combineReducers({
  [reducerNames.user]: userReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: UnknownAction,
) => {
  if (resetStoreAction.match(action)) {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createResetStoreMiddleware()),
});
