import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getGithubOAuth, getGoogleOAuth, getKakaoOAuth } from '@/apis/auth/auth';

import { useCoreQuery } from '../common/customQuery';

// 최종 아닙니다....
export default function useGetOAUTH() {
  const useGetKakaoOAuth = useCoreQuery(QUERY_KEYS.KAKAO_OAUTH, () => getKakaoOAuth);
  const useGetGoogleOAuth = useCoreQuery(QUERY_KEYS.GOOGLE_OAUTH, () => getGoogleOAuth);
  const useGetGithubOAuth = useCoreQuery(QUERY_KEYS.GITHUB_OAUTH, () => getGithubOAuth);

  return { useGetKakaoOAuth, useGetGoogleOAuth, useGetGithubOAuth };
}
