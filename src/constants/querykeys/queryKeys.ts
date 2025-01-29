import type { TRequestTeamMember } from '@/types/sidebar/sidebar';
import type { TSearchTestListRequest } from '@/types/test/test.ts';

export const QUERY_KEYS = {
  KAKAO_OAUTH: ['getKakaoOAuth'],
  GOOGLE_OAUTH: ['getGoogleOAuth'],
  GITHUB_OAUTH: ['getGithubOAuth'],
  PROJECT_LIST: ['getProjectList'],
  TEAM_MEMBER: ({ projectId, email }: TRequestTeamMember) => ['getTeamMember', projectId, email],
  GET_USER_PROJECT_LIST: (page: number | null) => ['getUserProjectList', page],
  GET_USER_INFO: ['getUserInfo'],
  GET_USER_SIDEBAR_INFO: ['getUserSidebarInfo'],
  DASHBOARD: {
    ERROR: (testId: number) => ['ERROR', testId],
    TEST: {
      LIST: ({ projectId, date, state, pageName, page, testName }: TSearchTestListRequest) => ['LIST', projectId, date, state, pageName, page, testName],
      STATISTICS: (projectId: number) => ['STATISTICS', projectId],
    },
  },
  GET_PROJECT_INFO: ['getProjectInfo'],
  GET_CHARACTER_LIST: ['getCharacterList'],
  GET_SCENARIO_INFO: ['getScenarioInfo'],
  GET_SCENARIO_LIST: ['getScenarioList'],
};
