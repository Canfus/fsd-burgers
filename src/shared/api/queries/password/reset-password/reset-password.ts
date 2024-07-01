import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { ResetPasswordResponse, ResetPasswordRequestBody } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useResetPasswordMutation = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    AxiosError,
    ResetPasswordRequestBody
  >,
) =>
  useMutation<ResetPasswordResponse, AxiosError, ResetPasswordRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<ResetPasswordResponse>(
        endpoints.getResetPassword(),
        credentials,
      );

      return data;
    },
    ...options,
  });
