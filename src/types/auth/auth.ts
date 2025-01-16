import type { TCommonResponse } from './../common/common';

export type TChangeUserInfo = {
  nickname?: string;
  profileImage?: string;
  bannerImage?: string;
};

export type TDefaultUserInfo = {
  nickname: string;
  profileImage?: string;
  bannerImage?: string;
};

export type TSignupValues = {
  email: string;
  password: string;
};

export type TLoginValues = {
  email: string;
  password: string;
};

export type TMailSendCode = string;

export type TSignupResponse = { isSuccess: boolean; code: string; message: string };

export type TMailSendCodeResponse = TCommonResponse<{
  authCode: string;
}>;

export type TLoginResponse = TCommonResponse<{ accessToken: string; refreshToken: string; type: string }>;
