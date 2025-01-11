import { axiosInstance } from '../axiosInstance';

const defaultSignup = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/v1/auth/sign-up', { email, password });
  return data;
};

export { defaultSignup };
