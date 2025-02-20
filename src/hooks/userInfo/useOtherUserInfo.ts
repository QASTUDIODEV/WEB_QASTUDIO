import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getOtherUserInfo } from '@/apis/userInfo/userInfo';

import { useCoreQuery } from '../common/customQuery';

export default function useOtherUserInfo({ userId }: { userId: string }) {
  return useCoreQuery(QUERY_KEYS.GET_OTHER_USER_INFO(userId), () => getOtherUserInfo(userId), {
    enabled: !!userId,
  });
}
