import type { TCommonResponse } from '../common/common';

// 오류 조회 API
export type TGetErrorRequest = {
  testId: number;
};

export type TGetErrorResponse = TCommonResponse<{
  testId: number;
  testName: string;
  errorImage: string;
  errorCode: string;
  errorMessage: string;
}>;
