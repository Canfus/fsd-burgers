import { Provider } from 'react-redux';

import { store } from '@shared/store';

import type { ProviderProps } from '../providers.interface';

export const ReduxProvider = ({ children }: ProviderProps) => (
  <Provider store={store}>{children}</Provider>
);
