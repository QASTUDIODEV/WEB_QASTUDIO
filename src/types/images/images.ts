import type { TCommonResponse } from './../common/common';

export type TUploadImageToPresignedUrlValue = {
  url: string;
  file: File;
};

export type TUploadImageToPresignedUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
};

export type TGetSinglePresignedUrlValue = {
  fileName: string;
};

export type TGetSinglePresignedUrlResponse = TCommonResponse<{ keyName: string; url: string }>;
