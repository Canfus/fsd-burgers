import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { UserResponse } from '@shared/api';

import { queryKeys, endpoints, STALE_TIME } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useGetUserQuery = (
  options?: Partial<UseSuspenseQueryOptions<UserResponse, AxiosError>>,
) =>
  useSuspenseQuery<UserResponse, AxiosError>({
    queryKey: queryKeys.getUser(),
    queryFn: async () => {
      const { data } = await customInstance.get<UserResponse>(
        endpoints.getUser(),
      );

      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
