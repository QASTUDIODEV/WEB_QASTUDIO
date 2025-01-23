import { keepPreviousData } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getUserProjectList } from '@/apis/userController/userController';

import { useCoreQuery } from '../common/customQuery';

export default function useProjects(currentPage: number) {
  const useGetMypageProjects = useCoreQuery(QUERY_KEYS.GET_USER_PROJECT_LIST(currentPage), () => getUserProjectList({ page: currentPage }), {
    placeholderData: keepPreviousData,
  });
  return { useGetMypageProjects };
}
