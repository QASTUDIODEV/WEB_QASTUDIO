import type { SOCIAL } from '@/enums/enums';

import type { TCommonResponse } from '../common/common';

export type TGetUserInfoResponse = TCommonResponse<{
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  account?: SOCIAL[] | undefined;
  projectCnt: number;
  isUser?: boolean;
}>;

export type TPatchUserInfoValues = {
  nickname: string;
  profileImage?: string;
  bannerImage?: string;
};

export type TPatchUserInfoResponse = TCommonResponse<{
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
  bannerImage: string;
  account: SOCIAL[];
}>;

export type TGetUserProjectsValues = {
  page?: number;
  userId?: string;
};

export type TUserProjectListResponse = {
  projectId: number;
  projectName: string;
  participant: number;
  lastModifiedDate: string;
  projectImage: string;
};

export type TGetUserProjectsResponse = TCommonResponse<{
  userProjectList: TUserProjectListResponse[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}>;

export type TGetUserEmailResponse = TCommonResponse<{
  email: string;
}>;
