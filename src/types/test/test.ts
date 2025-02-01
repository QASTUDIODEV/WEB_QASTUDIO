import type { TCommonResponse } from '@/types/common/common';
import type { TEST_STATE } from '@/enums/enums';

export type TTestListDTO = {
  testId: number;
  testDate: string;
  testName: string;
  pageName: string;
  attainment: number;
  state: TEST_STATE;
  time: number;
  nickname: string;
  errorId: number;
  scenarioRecord: string;
};

// 테스트 리스트 조회 API
export type TGetTestListRequest = {
  projectId: number;
  page?: number;
  date?: string;
  pageName?: string;
  state?: TEST_STATE | null;
  testName?: string;
};

export type TGetTestListResponse = TCommonResponse<{
  testList: TTestListDTO[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  offset: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
}>;

// 테스트 통계 조회 API
export type TGetStatisticsRequest = {
  projectId: number;
};

export type TGetStatisticsResponse = TCommonResponse<{
  projectId: number;
  projectName: string;
  projectImage: string | null;
  totalSuccessCnt: number;
  successRate: number;
  totalFailCnt: number;
  failRate: number;
  participant: number;
  totalTestCnt: number;
}>;
