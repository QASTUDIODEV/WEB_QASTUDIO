import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type TCommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type TResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

export type TUseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, TResponseError, TVariables, unknown>,
  'mutationFn'
>;

export type TUseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TResponseError, TData, QueryKey>,
  'queryKey'
>;
