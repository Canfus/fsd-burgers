import { RouterProvider } from './router';
import { ReactQueryProvider } from './react-query';
import { ReduxProvider } from './redux';
import { SuspenseProvider } from './suspense';
import { ErrorBoundaryProvider } from './error-boundary';
import { DialogsProvider } from './dialogs';
import { DndProvider } from './dnd';

import type { ProviderProps } from './providers.interface';

export const RootProvider = ({ children }: ProviderProps) => (
  <ErrorBoundaryProvider>
    <SuspenseProvider>
      <ReactQueryProvider>
        <ReduxProvider>
          <RouterProvider>
            <DndProvider>
              <DialogsProvider>{children}</DialogsProvider>
            </DndProvider>
          </RouterProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </SuspenseProvider>
  </ErrorBoundaryProvider>
);
