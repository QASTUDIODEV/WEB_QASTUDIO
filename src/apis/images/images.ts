import axios from 'axios';

import type {
  TGetSinglePresignedUrlResponse,
  TGetSinglePresignedUrlValue,
  TUploadImageToPresignedUrlResponse,
  TUploadImageToPresignedUrlValue,
} from '@/types/images/images';

import { sanitizeFilename } from '@/utils/santizeFilename';
import { axiosInstance } from '@/apis/axiosInstance';

const getSinglePresignedUrl = async (fileName: TGetSinglePresignedUrlValue): Promise<TGetSinglePresignedUrlResponse> => {
  const name = sanitizeFilename(fileName.fileName); // 파일명의 공백 _ 로 치환하는 함수
  const { data } = await axiosInstance.post('/api/v0/s3/presigned/upload', { fileName: name });
  return data;
};

const uploadImageToPresignedUrl = async ({ url, file }: TUploadImageToPresignedUrlValue): Promise<TUploadImageToPresignedUrlResponse> => {
  const { data } = await axios.put(url, file);
  return data;
};

export { getSinglePresignedUrl, uploadImageToPresignedUrl };
