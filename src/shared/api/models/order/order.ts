import type { BaseResponse } from '../base-response.interface';

export interface OrderRequestBody {
  ingredients: string[];
}

interface OrderResponseBody {
  name: string;
  order: {
    number: number;
  };
}

export type OrderResponse = BaseResponse<OrderResponseBody>;

