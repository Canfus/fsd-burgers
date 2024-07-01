import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ProviderProps } from '../providers.interface';

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
