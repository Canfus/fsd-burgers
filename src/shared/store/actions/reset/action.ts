import { createAction } from '@reduxjs/toolkit';

import { RESET_STORE } from '@shared/constants';

export const resetStoreAction = createAction(RESET_STORE);
