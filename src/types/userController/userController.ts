import type { TCommonResponse } from '../common/common';

export type TGetUserInfoResponse = TCommonResponse<{
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  account: 'KAKAO' | 'GITHUB' | 'GOOGLE'[];
}>;

export type TPatchUserInfoValues = {
  nickname: string;
  profileImage: string;
  bannerImage: string;
};

export type TPatchUserInfoResponse = TCommonResponse<{
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  account: 'KAKAO' | 'GITHUB' | 'GOOGLE'[];
}>;

export type TGetUserProjectsValues = {
  page?: number;
};

export type TUserProjectListResponse = {
  projectId: number;
  projectName: string;
  participant: number;
  lastModifiedDate: Date;
};

export type TGetUserProjectsResponse = TCommonResponse<{
  userProjectList: TUserProjectListResponse[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}>;
