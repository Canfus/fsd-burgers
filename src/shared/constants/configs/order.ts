import type { OrderStatus } from '@shared/api';

export const orderStatusConfig: Record<OrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};