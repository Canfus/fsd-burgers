import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundaryFallback } from '@shared/widget';

import type { ProviderProps } from '../providers.interface';

export const ErrorBoundaryProvider = ({ children }: ProviderProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
      {children}
    </ErrorBoundary>
  );
};
