import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { ForgotPasswordResponse, ForgotPasswordRequestBody } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useForgotPasswordMutation = (
  options?: UseMutationOptions<
    ForgotPasswordResponse,
    AxiosError,
    ForgotPasswordRequestBody
  >,
) =>
  useMutation<ForgotPasswordResponse, AxiosError, ForgotPasswordRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<ForgotPasswordResponse>(
        endpoints.getForgotPassword(),
        credentials,
      );

      return data;
    },
    ...options,
  });
