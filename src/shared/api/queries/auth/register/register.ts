import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { RegisterResponse, RegisterRequestBody } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    AxiosError,
    RegisterRequestBody
  >,
) =>
  useMutation<RegisterResponse, AxiosError, RegisterRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.post<RegisterResponse>(
        endpoints.getRegister(),
        credentials,
      );

      return data;
    },
    ...options,
  });
