import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getOtherUserProjectList } from '@/apis/userInfo/userInfo';

import { useCoreQuery } from '../common/customQuery';

export default function useOtherUserProjects({ userId, currentPage }: { userId: string; currentPage?: number }) {
  return useCoreQuery(QUERY_KEYS.GET_OTHER_USER_PROJECT_LIST({ userId, page: currentPage! }), () => getOtherUserProjectList({ page: currentPage, userId }), {
    enabled: !!userId,
  });
}
