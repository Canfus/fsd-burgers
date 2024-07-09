import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { OrderListResponse } from '@shared/api';

import { queryKeys, endpoints, STALE_TIME } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useGetOrderQuery = (
  number: string,
  options?: Partial<UseSuspenseQueryOptions<OrderListResponse, AxiosError>>,
) =>
  useSuspenseQuery<OrderListResponse, AxiosError>({
    queryKey: queryKeys.getOrder(number),
    queryFn: async () => {
      const { data } = await customInstance.get<OrderListResponse>(
        endpoints.getOrder(number),
      );

      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
