import type { TGetUserInfoResponse, TGetUserProjectsResponse, TGetUserProjectsValues } from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

const getOtherUserInfo = async (userId: string): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/users/${userId}`);
  return data;
};

const getOtherUserProjectList = async ({ page, userId }: TGetUserProjectsValues): Promise<TGetUserProjectsResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/users/projects/${userId}?page=${page}`);
  return data;
};

export { getOtherUserInfo, getOtherUserProjectList };
