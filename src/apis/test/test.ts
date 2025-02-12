import type { TGetStatisticsRequest, TGetStatisticsResponse, TGetTestListRequest, TGetTestListResponse } from '@/types/test/test';
import { TEST_STATE } from '@/enums/enums.ts';

import { axiosInstance } from '../axiosInstance';

// 테스트 리스트 조회 API
export const getTestList = async ({ projectId, date, state, pageName, page, testName }: TGetTestListRequest): Promise<TGetTestListResponse> => {
  const params: Record<string, any> = {
    page,
    testName,
    date,
  };

  if (state && state !== TEST_STATE.ALL) {
    params.state = state;
  }

  if (pageName && pageName !== 'All') {
    params.pageName = pageName;
  }

  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/tests`, {
    params,
  });

  return data;
};

// 테스트 통계 조회 API
export const getStatistics = async ({ projectId }: TGetStatisticsRequest): Promise<TGetStatisticsResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/tests/statistics`);

  return data;
};
