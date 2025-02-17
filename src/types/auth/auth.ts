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

export type TUserSettingValues = {
  nickname: string;
  profileImage: string;
};

export type TChangePasswordValues = {
  email: string;
  newPassword: string;
};

export type TInviteAcceptValues = {
  token: string;
};

export type TInviteAcceptNewMemberValues = {
  token: string;
  email: string;
};
export type TInviteAcceptResponse = TCommonResponse<{
  projectId: number;
}>;

export type TMailSendCode = string;

export type TSignupResponse = { isSuccess: boolean; code: string; message: string };

export type TMailSendCodeResponse = TCommonResponse<{
  authCode: string;
}>;

export type TLoginResponse = TCommonResponse<{ nickname: string }>;

export type TUserSettingResponse = TCommonResponse<{ nickname: string; profileImage: string | null }>;

export type TChangePasswordResponse = { isSuccess: boolean; code: string; message: string };
