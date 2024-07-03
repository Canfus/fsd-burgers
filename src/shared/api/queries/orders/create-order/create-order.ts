import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { OrderRequestBody, OrderResponse } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useCreateOrderMutation = (
  options?: UseMutationOptions<OrderResponse, AxiosError, OrderRequestBody>,
) =>
  useMutation<OrderResponse, AxiosError, OrderRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<OrderResponse>(
        endpoints.getCreateOrder(),
        credentials,
      );

      return data;
    },
    ...options,
  });

