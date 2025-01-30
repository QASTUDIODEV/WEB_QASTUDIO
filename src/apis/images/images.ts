import axios from 'axios';

import type {
  TGetSinglePresignedUrlResponse,
  TGetSinglePresignedUrlValue,
  TUploadImageToPresignedUrlResponse,
  TUploadImageToPresignedUrlValue,
} from '@/types/images/images';

import { axiosInstance } from '@/apis/axiosInstance';

const getSinglePresignedUrl = async (fileName: TGetSinglePresignedUrlValue): Promise<TGetSinglePresignedUrlResponse> => {
  const { data } = await axiosInstance.post('/api/v0/s3/presigned/upload', fileName);
  return data;
};

const uploadImageToPresignedUrl = async ({ url, file }: TUploadImageToPresignedUrlValue): Promise<TUploadImageToPresignedUrlResponse> => {
  const { data } = await axios.put(url, file);
  return data;
};

export { getSinglePresignedUrl, uploadImageToPresignedUrl };
