import type { TSearchTestListRequest } from '@/types/test/test.ts';

export const QUERY_KEYS = {
  KAKAO_OAUTH: ['getKakaoOAuth'],
  GOOGLE_OAUTH: ['getGoogleOAuth'],
  GITHUB_OAUTH: ['getGithubOAuth'],
  GET_USER_PROJECT_LIST: (page: number | null) => ['getUserProjectList', page],
  GET_USER_INFO: ['getUserInfo'],
  DASHBOARD: {
    ERROR: (testId: number) => ['ERROR', testId],
    TEST: {
      LIST: ({ projectId, date, state, pageName, page, testName }: TSearchTestListRequest) => ['LIST', projectId, date, state, pageName, page, testName],
      STATISTICS: (projectId: number) => ['STATISTICS', projectId],
    },
  },
};
