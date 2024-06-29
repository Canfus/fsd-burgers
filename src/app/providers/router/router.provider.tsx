import { BrowserRouter } from 'react-router-dom';

import type { ProviderProps } from '../providers.interface';

export const RouterProvider = ({ children }: ProviderProps) => (
  <BrowserRouter>{children}</BrowserRouter>
);
