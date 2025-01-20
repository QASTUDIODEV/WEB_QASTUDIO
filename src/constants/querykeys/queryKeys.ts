export const QUERY_KEYS = {
  KAKAO_OAUTH: (code: string) => ['getKakaoOAuth', code],
  GET_USER_INFO: ['getUserInfo'],
  GET_USER_PROJECT_LIST: (page: number | null) => ['getUserProjectList', page],
};
