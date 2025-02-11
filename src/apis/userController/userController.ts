import type {
  TGetUserInfoResponse,
  TGetUserProjectsResponse,
  TGetUserProjectsValues,
  TPatchUserInfoResponse,
  TPatchUserInfoValues,
} from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

export const getUserInfo = async (): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get('/api/v0/users');
  return data;
};
export const getSidebarUserInfo = async (): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get('/api/v0/users/profile');
  return data;
};
export const patchUserInfo = async ({ nickname, profileImage, bannerImage }: TPatchUserInfoValues): Promise<TPatchUserInfoResponse> => {
  const { data } = await axiosInstance.patch('/api/v0/users', { nickname, profileImage, bannerImage });
  return data;
};

export const getUserProjectList = async ({ page }: TGetUserProjectsValues): Promise<TGetUserProjectsResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/users/projects?page=${page}`);
  return data;
};
