export const QUERY_KEYS = {
  KAKAO_OAUTH: (code: string) => ['getKakaoOAuth', code],
  GET_USER_INFO: ['getUserInfo'],
  DASHBOARD: {
    ERROR: (testId: number) => ['ERROR', testId],
    TEST: {
      LIST: (projectId: number) => ['LIST', projectId],
      STATISTICS: (projectId: number) => ['STATISTICS', projectId],
    },
  },
};
