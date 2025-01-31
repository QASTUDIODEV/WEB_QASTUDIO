import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getOtherUserInfo, getOtherUserProjectList } from '@/apis/userInfo/userInfo';

import { useCoreQuery } from '../common/customQuery';

export default function useOtherUserInfo({ userId, currentPage }: { userId: string; currentPage: number }) {
  const useGetOtherUserInfo = useCoreQuery(QUERY_KEYS.GET_OTHER_USER_INFO(userId), () => getOtherUserInfo(userId));
  const useGetOtherUserProjects = useCoreQuery(QUERY_KEYS.GET_OTHER_USER_PROJECT_LIST({ userId, page: currentPage }), () =>
    getOtherUserProjectList({ page: currentPage, userId }),
  );
  return { useGetOtherUserInfo, useGetOtherUserProjects };
}
