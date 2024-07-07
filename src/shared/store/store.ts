import {
  configureStore,
  combineReducers,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { resetStoreAction } from './actions';
import {
  createResetStoreMiddleware,
  createSocketMiddleware,
} from './middleware';
import {
  userReducer,
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  orderListReducer,
  socketReducer,
  socketActions,
} from './slices';

const combinedReducer = combineReducers({
  userReducer,
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  orderListReducer,
  socketReducer,
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
    getDefaultMiddleware().concat(
      createResetStoreMiddleware(),
      createSocketMiddleware(socketActions),
    ),
});
