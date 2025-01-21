import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getUserInfo } from '@/apis/userController/userController';

import { useCoreQuery } from '../common/customQuery';

export default function useGetUserInfo() {
  return useCoreQuery(QUERY_KEYS.GET_USER_INFO, () => getUserInfo());
}
