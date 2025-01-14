import { axiosInstance } from '@/apis/axiosInstance';

const defaultSignup = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/v0/auth/sign-up', { email, password });
  return data;
};

const getKakaoOAuth = async (code: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao-oauth?code=${code}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

const authSendEmailCode = async (email: string) => {
  const { data } = await axiosInstance.post('/v0/auth/sign-up/email', { email });
  return data;
};

const defaultLogin = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('v0/auth/login/local', { email, password });
  return data;
};

export { authSendEmailCode, defaultLogin, defaultSignup, getKakaoOAuth };
