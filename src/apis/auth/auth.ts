import { axiosInstance } from '../axiosInstance';

const defaultSignup = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/v1/auth/sign-up', { email, password });
  return data;
};

const authSendEmailCode = async (email: string) => {
  const { data } = await axiosInstance.post('/v0/auth/sign-up/email', { email });
  return data;
};

const uploadSingleImg = async (img: File) => {
  const formData = new FormData();
  formData.append('image', img);

  try {
    const { data } = await axiosInstance.post(
      '/v0/s3/presigned/upload',
      { formData },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

export { authSendEmailCode, defaultSignup, uploadSingleImg };
