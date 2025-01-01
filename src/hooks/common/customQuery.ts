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
  });
}

export function useCoreMutation<T, U>(mutation: MutationFunction<T, U>, options?: TUseMutationCustomOptions) {
  return useMutation({
    mutationFn: mutation,
    onError: (error) => {
      toast.error(error.response?.data.message || '알 수 없는 오류가 발생했습니다.');
    },
    ...options,
  });
}
