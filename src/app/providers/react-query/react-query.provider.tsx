import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ProviderProps } from '../providers.interface';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const ReactQueryProvider = ({ children }: ProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
