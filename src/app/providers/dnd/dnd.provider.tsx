import type { FC } from 'react';
import { DndProvider as DNDProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { ProviderProps } from '../providers.interface';

export const DndProvider: FC<ProviderProps> = ({ children }) => (
  <DNDProvider backend={HTML5Backend}>{children}</DNDProvider>
);

