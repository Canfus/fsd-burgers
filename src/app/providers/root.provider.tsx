import { RouterProvider } from './router';
import { ReactQueryProvider } from './react-query';
import { ReduxProvider } from './redux';

import type { ProviderProps } from './providers.interface';

export const RootProvider = ({ children }: ProviderProps) => (
  <ReactQueryProvider>
    <ReduxProvider>
      <RouterProvider>{children}</RouterProvider>
    </ReduxProvider>
  </ReactQueryProvider>
);
