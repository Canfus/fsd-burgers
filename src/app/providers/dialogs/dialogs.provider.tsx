import { FC } from 'react';

import { IngredientPreviewDialog, OrderDialog } from '@shared/widget';

import type { ProviderProps } from '../providers.interface';

export const DialogsProvider: FC<ProviderProps> = ({ children }) => (
  <>
    {children}
    <IngredientPreviewDialog />
    <OrderDialog />
  </>
);

