import type {
  TGetUserInfoResponse,
  TGetUserProjectsResponse,
  TGetUserProjectsValues,
  TPatchUserInfoResponse,
  TPatchUserInfoValues,
} from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

const getUserInfo = async (): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get('/api/v0/users');
  return data;
};

const patchUserInfo = async ({ nickname, profileImage, bannerImage }: TPatchUserInfoValues): Promise<TPatchUserInfoResponse> => {
  const { data } = await axiosInstance.patch('/api/v0/users', { nickname, profileImage, bannerImage });
  return data;
};

const getUserProjectList = async ({ page }: TGetUserProjectsValues): Promise<TGetUserProjectsResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/users/projects?page=${page}`);
  return data;
};
export default { getUserInfo, patchUserInfo, getUserProjectList };
