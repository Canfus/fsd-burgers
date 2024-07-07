import type { OrderItem } from '@shared/api';

export interface OrderProps extends React.HTMLAttributes<HTMLLIElement> {
  order: OrderItem;
  status?: boolean;
}

