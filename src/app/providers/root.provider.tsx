import { RouterProvider } from './router';
import { ReactQueryProvider } from './react-query';

import type { ProviderProps } from './providers.interface';

export const RootProvider = ({ children }: ProviderProps) => (
  <ReactQueryProvider>
    <RouterProvider>{children}</RouterProvider>
  </ReactQueryProvider>
);
