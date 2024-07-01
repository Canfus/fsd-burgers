import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LoginResponse, LoginRequestBody } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequestBody>,
) =>
  useMutation<LoginResponse, AxiosError, LoginRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<LoginResponse>(
        endpoints.getLogin(),
        credentials,
      );

      return data;
    },
    ...options,
  });
