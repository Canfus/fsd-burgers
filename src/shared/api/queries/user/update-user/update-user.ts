import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { UserResponse, UserRequestBody } from '@shared/api';

import { endpoints } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useUpdateUserMutation = (
  options?: UseMutationOptions<UserResponse, AxiosError, UserRequestBody>,
) =>
  useMutation<UserResponse, AxiosError, UserRequestBody>({
    mutationFn: async (credentials) => {
      const { data } = await customInstance.patch<UserResponse>(
        endpoints.getUpdateUser(),
        credentials,
      );

      return data;
    },
    ...options,
  });
