import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';
import type { Credentials } from './logout.interface';

export const useLogoutMutation = (
  options?: UseMutationOptions<unknown, AxiosError, Credentials>,
) =>
  useMutation<unknown, AxiosError, Credentials>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<unknown>(
        endpoints.getLogout(),
        credentials,
      );

      return data;
    },
    ...options,
  });

