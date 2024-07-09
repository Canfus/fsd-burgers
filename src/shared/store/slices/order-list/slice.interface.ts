import type { OrderItem } from '@shared/api';

export interface Slice {
  orders: OrderItem[];
  total: number | null;
  totalToday: number | null;
}
