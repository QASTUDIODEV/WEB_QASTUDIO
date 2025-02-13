import { type MutationFunction, type QueryFunction, type QueryKey, useMutation, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { TUseMutationCustomOptions, TUseQueryCustomOptions } from '@/types/common/common';

export function useCoreQuery<TQueryFnData, TData = TQueryFnData>(
  keyName: QueryKey,
  query: QueryFunction<TQueryFnData, QueryKey>,
  options?: TUseQueryCustomOptions<TQueryFnData, TData>,
): UseQueryResult<TData, AxiosError> {
  return useQuery({
    queryKey: keyName,
    queryFn: query,
    ...options,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCoreMutation<T, U>(mutation: MutationFunction<T, U>, options?: TUseMutationCustomOptions) {
  return useMutation({
    mutationFn: mutation,
    onError: (error) => {
      toast.error(error.response?.data.message || 'An error occurred.');
    },
    ...options,
  });
}
