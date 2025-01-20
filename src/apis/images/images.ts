import axios from 'axios';

import { axiosInstance } from '@/apis/axiosInstance';

const uploadSingleImg = async (fileName: string) => {
  const token = localStorage.getItem('accessToken');
  const { data } = await axiosInstance.post(
    '/api/v0/s3/presigned/upload',
    { fileName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

const uploadPresignedUrl = async (url: string, file: File) => {
  const data = axios.put(url, file);
  return data;
};

export { uploadPresignedUrl, uploadSingleImg };
