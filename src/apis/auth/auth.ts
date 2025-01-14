import { axiosInstance } from '@/apis/axiosInstance';

import type { TLoginResponse, TLoginValues, TMailSendCode, TMailSendCodeResponse, TSignupResponse, TSignupValues } from '../../types/auth/auth';

const defaultSignup = async ({ email, password }: TSignupValues): Promise<TSignupResponse> => {
  const { data } = await axiosInstance.post('/v0/auth/sign-up', { email, password });
  return data;
};

const getKakaoOAuth = async (code: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao-oauth?code=${code}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

const authSendEmailCode = async (email: TMailSendCode): Promise<TMailSendCodeResponse> => {
  const { data } = await axiosInstance.post('/v0/auth/sign-up/email', { email });
  return data;
};

const defaultLogin = async ({ email, password }: TLoginValues): Promise<TLoginResponse> => {
  const { data } = await axiosInstance.post('v0/auth/login/local', { email, password });
  return data;
};

export { authSendEmailCode, defaultLogin, defaultSignup, getKakaoOAuth };
