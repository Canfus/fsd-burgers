import type { BaseResponse } from '../../base-response.interface';

import type { Order } from '../create-order';

export type OrderStatus = 'created' | 'pending' | 'done';

export type OrderItem = Order & {
  _id: string;
  name: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
};

export type OrderListResponse = BaseResponse<{
  total: number;
  totalToday: number;
  orders: OrderItem[];
}>;

