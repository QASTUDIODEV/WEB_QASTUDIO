import { useQuery } from '@tanstack/react-query';

import type { TGetUserInfoResponse } from '@/types/userController/userController';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getUserInfo } from '@/apis/userController/userController';

export function useGetUserInfo() {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<TGetUserInfoResponse, Error>({
    queryKey: QUERY_KEYS.GET_USER_INFO,
    queryFn: getUserInfo,
  });

  return { userData, isLoading, error };
}
