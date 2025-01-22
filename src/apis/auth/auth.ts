import { axiosInstance } from '@/apis/axiosInstance';

import type {
  TChangePasswordResponse,
  TChangePasswordValues,
  TLoginResponse,
  TLoginValues,
  TMailSendCode,
  TMailSendCodeResponse,
  TSignupResponse,
  TSignupValues,
  TUserSettingResponse,
  TUserSettingValues,
} from '../../types/auth/auth';

const defaultSignup = async ({ email, password }: TSignupValues): Promise<TSignupResponse> => {
  const { data } = await axiosInstance.post('/api/v0/auth/sign-up', { email, password });
  return data;
};

const getKakaoOAuth = async () => {
  const { data } = await axiosInstance.get('/api/v0/auth/login/kakao');
  return data;
};
const getGoogleOAuth = async () => {
  const { data } = await axiosInstance.get('/api/v0/auth/login/google');
  return data;
};

const getGithubOAuth = async () => {
  const { data } = await axiosInstance.get('/api/v0/auth/login/github');
  return data;
};

const authSendEmailCode = async (email: TMailSendCode): Promise<TMailSendCodeResponse> => {
  const { data } = await axiosInstance.post('/api/v0/auth/sign-up/email', { email });
  return data;
};

const defaultLogin = async ({ email, password }: TLoginValues): Promise<TLoginResponse> => {
  const { data } = await axiosInstance.post('/api/v0/auth/login/local', { email, password });
  return data;
};

const userSetting = async ({ nickname, profileImage }: TUserSettingValues): Promise<TUserSettingResponse> => {
  const { data } = await axiosInstance.post('/api/v0/users/profile', { nickname, profileImage });
  return data;
};

const refresh = async () => {
  const { data } = await axiosInstance.post('refresh'); // 아직 동작 안합니당...
  return data;
};

const findingSendEmailCode = async (email: TMailSendCode): Promise<TMailSendCodeResponse> => {
  const { data } = await axiosInstance.post('/api/v0/auth/update/password/email', { email });
  return data;
};

const changePassword = async ({ email, newPassword }: TChangePasswordValues): Promise<TChangePasswordResponse> => {
  const { data } = await axiosInstance.post('/api/v0/auth/update/password', { email: email, newPassword: newPassword });
  return data;
};
export {
  authSendEmailCode,
  changePassword,
  defaultLogin,
  defaultSignup,
  findingSendEmailCode,
  getGithubOAuth,
  getGoogleOAuth,
  getKakaoOAuth,
  refresh,
  userSetting,
};
