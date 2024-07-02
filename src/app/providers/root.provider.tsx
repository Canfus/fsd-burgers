import { RouterProvider } from './router';
import { ReactQueryProvider } from './react-query';
import { ReduxProvider } from './redux';
import { SuspenseProvider } from './suspense';
import { ErrorBoundaryProvider } from './error-boundary';

import type { ProviderProps } from './providers.interface';

export const RootProvider = ({ children }: ProviderProps) => (
  <ErrorBoundaryProvider>
    <SuspenseProvider>
      <ReactQueryProvider>
        <ReduxProvider>
          <RouterProvider>{children}</RouterProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </SuspenseProvider>
  </ErrorBoundaryProvider>
);
