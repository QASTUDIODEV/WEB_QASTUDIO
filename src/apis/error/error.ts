// 오류 조회 API
import type { TGetErrorRequest, TGetErrorResponse } from '@/types/error/error.ts';

import { axiosInstance } from '@/apis/axiosInstance.ts';

export const getError = async ({ testId }: TGetErrorRequest): Promise<TGetErrorResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/tests/${testId}/errors`);

  return data;
};
