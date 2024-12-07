import { HashRouter } from 'react-router-dom';

import type { ProviderProps } from '../providers.interface';

export const RouterProvider = ({ children }: ProviderProps) => (
  <HashRouter>{children}</HashRouter>
);
