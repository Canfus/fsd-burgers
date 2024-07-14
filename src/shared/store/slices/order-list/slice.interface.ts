import type { OrderItem } from '@shared/api';

export interface Slice {
  orders: OrderItem[] | null;
  total: number | null;
  totalToday: number | null;
}
