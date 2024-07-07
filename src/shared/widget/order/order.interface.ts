import type { OrderItem } from '@shared/api';

export interface OrderProps extends React.HTMLAttributes<HTMLDivElement> {
  order: OrderItem;
  status?: boolean;
}

