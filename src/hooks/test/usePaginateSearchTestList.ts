import { keepPreviousData } from '@tanstack/react-query';

import type { TSearchTestListRequest } from '@/types/test/test';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { searchTestList } from '@/apis/test/test';

import { useCoreQuery } from '../common/customQuery';

// 테스트 검색 API
export default function usePaginateSearchTestList({ projectId, date, state, pageName, page, testName }: TSearchTestListRequest) {
  return useCoreQuery(
    [QUERY_KEYS.DASHBOARD.TEST.LIST(projectId), testName, date, state, pageName, page],
    () => searchTestList({ projectId, date, state, pageName, page, testName }),
    {
      placeholderData: keepPreviousData,
    },
  );
}
