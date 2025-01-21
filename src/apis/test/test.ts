import type {
  TGetStatisticsRequest,
  TGetStatisticsResponse,
  TGetTestListRequest,
  TGetTestListResponse,
  TSearchTestListRequest,
  TSearchTestListResponse,
} from '@/types/test/test';

import { axiosInstance } from '../axiosInstance';

// 테스트 리스트 조회 API
export const getTestList = async ({ projectId, date, state, pageName, page }: TGetTestListRequest): Promise<TGetTestListResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/projects/${projectId}/tests`, {
    params: { page, pageName, date, state },
  });

  return data;
};

// 테스트 통계 조회 API
export const getStatistics = async ({ projectId }: TGetStatisticsRequest): Promise<TGetStatisticsResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/projects/${projectId}/tests/statistics`);

  return data;
};

// 테스트 검색 API
export const searchTestList = async ({ projectId, testName, pageName, page, date, state }: TSearchTestListRequest): Promise<TSearchTestListResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/projects/${projectId}/tests/search`, {
    params: { testName, page, pageName, date, state },
  });

  return data;
};
