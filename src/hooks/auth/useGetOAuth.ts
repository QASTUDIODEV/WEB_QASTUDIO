import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getKakaoOAuth } from '@/apis/auth/auth';

// 최종 아닙니다....
export function useGetKakaoOAuth(code: string) {
  return useQuery({
    queryKey: QUERY_KEYS.KAKAO_OAUTH(code),
    queryFn: () => getKakaoOAuth(code),
  });
}
