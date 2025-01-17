import type {
  TGetUserInfoResponse,
  TGetUserProjectsResponse,
  TGetUserProjectsValues,
  TPatchUserInfoResponse,
  TPatchUserInfoValues,
} from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

// //아직 api가 미완성이라 추후 연결 예정입니다
export const getUserInfo = async (): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get('/v0/users');
  return data;
};

export const patchUserInfo = async ({ nickname, profileImage, bannerImage }: TPatchUserInfoValues): Promise<TPatchUserInfoResponse> => {
  const { data } = await axiosInstance.patch('/v0/users', { nickname, profileImage, bannerImage });
  return data;
};

export const getUserProjectList = async ({ page }: TGetUserProjectsValues): Promise<TGetUserProjectsResponse> => {
  const queryString = page ? `?page=${page}` : '';
  const { data } = await axiosInstance.get(`/v0/users/projects${queryString}`);
  return data;
};
