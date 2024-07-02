import { Suspense } from 'react';

import { SuspenseFallback } from '@shared/widget';

import type { ProviderProps } from '../providers.interface';

export const SuspenseProvider = ({ children }: ProviderProps) => (
  <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
);
