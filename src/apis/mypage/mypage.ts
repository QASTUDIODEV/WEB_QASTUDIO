import type { TGetUserInfoResponse, TPatchUserInfoResponse, TPatchUserInfoValues } from '@/types/userController/userController';

import { axiosInstance } from '../axiosInstance';

//아직 api가 미완성이라 추후 연결 예정입니다
const getUserInfo = async (): Promise<TGetUserInfoResponse> => {
  const { data } = await axiosInstance.get('/v0/users');
  return data;
};

const patchUserInfo = async ({ nickname, profileImage, bannerImage }: TPatchUserInfoValues): Promise<TPatchUserInfoResponse> => {
  const { data } = await axiosInstance.patch('/v0/users', { nickname, profileImage, bannerImage });
  return data;
};

export default { getUserInfo, patchUserInfo };
