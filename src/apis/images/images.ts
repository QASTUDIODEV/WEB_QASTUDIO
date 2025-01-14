import axios from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

const uploadSingleImg = async (fileName: string) => {
  const { data } = await axiosInstance.post('/v0/s3/presigned/upload', { fileName });
  return data;
};

const uploadPresignedUrl = async (url: string, file: File) => {
  const data = axios.put(url, file);
  return data;
};

export { uploadPresignedUrl, uploadSingleImg };
