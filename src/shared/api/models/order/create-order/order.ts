import type { BaseResponse } from '../../base-response.interface';

export interface OrderRequestBody {
  ingredients: string[];
}

export interface Order {
  number: number;
}

interface OrderResponseBody {
  name: string;
  order: Order;
}

export type OrderResponse = BaseResponse<OrderResponseBody>;

