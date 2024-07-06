import { FC } from 'react';

import { IngredientPreviewDialog } from '@shared/widget';

import type { ProviderProps } from '../providers.interface';

export const DialogsProvider: FC<ProviderProps> = ({ children }) => (
  <>
    {children}
    <IngredientPreviewDialog />
  </>
);

