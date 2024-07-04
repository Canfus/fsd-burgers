import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { IngredientListResponse } from '@shared/api';

import { queryKeys, endpoints, STALE_TIME } from '../../queries.constants';
import { customInstance } from '../../../api.instance';

export const useGetIngredientListQuery = (
  options?: Partial<
    UseSuspenseQueryOptions<IngredientListResponse, AxiosError>
  >,
) =>
  useSuspenseQuery<IngredientListResponse, AxiosError>({
    queryKey: queryKeys.getIngredientList(),
    queryFn: async ({ signal }) => {
      const { data } = await customInstance.get<IngredientListResponse>(
        endpoints.getIngredientList(),
        { signal },
      );

      return data;
    },
    staleTime: STALE_TIME,
    ...options,
  });
