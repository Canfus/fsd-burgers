import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { ProviderProps } from '../providers.interface';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, error) => {
        if (error instanceof AxiosError) {
          const { status } = error.response || {};

          if (status === 403) {
            return true;
          }
        }

        return false;
      },
    },
    mutations: {
      retry: (_, error) => {
        if (error instanceof AxiosError) {
          const { status } = error.response || {};

          if (status === 403) {
            return true;
          }
        }

        return false;
      },
    },
  },
});

export const ReactQueryProvider = ({ children }: ProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
