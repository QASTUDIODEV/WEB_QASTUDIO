import type { TCharacterId, TProjectInfo } from '@/types/projectInfo/projectInfo';
import type { TGetCharacterListValue } from '@/types/scenario/scenario';
import type { TRequestTeamMember } from '@/types/sidebar/sidebar';
import type { TGetTestListRequest } from '@/types/test/test';

export const QUERY_KEYS = {
  KAKAO_OAUTH: ['getKakaoOAuth'],
  GOOGLE_OAUTH: ['getGoogleOAuth'],
  GITHUB_OAUTH: ['getGithubOAuth'],
  PROJECT_LIST: ['getProjectList'],
  TEAM_MEMBER: ({ projectId, email }: TRequestTeamMember) => ['getTeamMember', projectId, email],
  PROJECT_INFO: ({ projectId }: TProjectInfo) => ['getProjectInfo', projectId],
  PROJECT_MEMBER: ({ projectId }: TProjectInfo) => ['getProjectMember', projectId],
  PROJECT_MEMBER_EMAIL: ({ projectId }: TProjectInfo) => ['getMemberEmail', projectId],
  PATH: ({ projectId }: TProjectInfo) => ['getPath', projectId],
  CHARACTER: ({ projectId }: TProjectInfo) => ['getCharacter', projectId],
  SCENARIO: ({ characterId }: TCharacterId) => ['getScenario', characterId],
  GET_USER_PROJECT_LIST: (page: number | null) => ['getUserProjectList', page],
  GET_OTHER_USER_PROJECT_LIST: ({ page, userId }: { page: number; userId: string }) => ['getUserProjectList', page, userId],
  PAGE_SUMMARY: ({ projectId }: TProjectInfo) => ['getPageSummary', projectId],
  GET_USER_INFO: ['getUserInfo'],
  GET_USER_SIDEBAR_INFO: ['getUserSidebarInfo'],
  GET_OTHER_USER_INFO: (userId: string) => ['getUserInfo', userId],
  DASHBOARD: {
    ERROR: (testId: number) => ['ERROR', testId],
    TEST: {
      LIST: ({ projectId, date, state, pageName, page, testName }: TGetTestListRequest) => ['LIST', projectId, date, state, pageName, page, testName],
      STATISTICS: (projectId: number) => ['STATISTICS', projectId],
    },
  },
  GET_PROJECT_INFO: ['getProjectInfo'],
  GET_SCENARIO_LIST: ['getScenarioList'],
  GET_CHARACTER_LIST2: ['getcharacterList'],
  GET_SUMMARY_PROJECT_INFO: (projectId: string) => ['getSummaryProjectInfo', projectId],
  GET_CHARACTER_LIST: ({ currentPage, projectId }: TGetCharacterListValue) => ['getCharacterList', currentPage, projectId],
  GET_ALL_PATHS: (projectId: string) => ['getAllPaths', projectId],
  GET_USER_EMAIL: ['getUserEmail'],
};
