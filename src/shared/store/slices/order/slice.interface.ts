import type { Order } from '@shared/api';

export interface Slice {
  order: Order | null;
  dialogState: boolean;
}

