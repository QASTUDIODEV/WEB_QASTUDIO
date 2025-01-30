import type { TGetStatisticsRequest, TGetStatisticsResponse, TGetTestListRequest, TGetTestListResponse } from '@/types/test/test';

import { axiosInstance } from '../axiosInstance';

// 테스트 리스트 조회 API
export const getTestList = async ({ projectId, date, state, pageName, page, testName }: TGetTestListRequest): Promise<TGetTestListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/tests`, {
    params: { page, pageName, date, state, testName },
  });

  return data;
};

// 테스트 통계 조회 API
export const getStatistics = async ({ projectId }: TGetStatisticsRequest): Promise<TGetStatisticsResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/tests/statistics`);

  return data;
};
