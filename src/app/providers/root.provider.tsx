import { RouterProvider } from './router';

import type { ProviderProps } from './providers.interface';

export const RootProvider = ({ children }: ProviderProps) => (
  <RouterProvider>{children}</RouterProvider>
);
