import type {
  TGetUserInfoResponse,
  TGetUserProjectsResponse,
  TGetUserProjectsValues,
  TPatchUserInfoResponse,
  TPatchUserInfoValues,
} from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

//아직 api가 미완성이라 추후 연결 예정입니다
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
