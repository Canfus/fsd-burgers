import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { resetStoreAction } from '../../actions';

export const createResetStoreMiddleware =
  (): Middleware =>
  ({ getState }) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  (next) => {
    const initialState = getState();

    return (action: UnknownAction) => {
      if (resetStoreAction.match(action)) {
        const actionWithInitialState = {
          ...action,
          payload: initialState,
        };

        return next(actionWithInitialState);
      }

      return next(action);
    };
  };
