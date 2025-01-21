import { keepPreviousData } from '@tanstack/react-query';

import type { TGetTestListRequest } from '@/types/test/test.ts';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys.ts';

import { getTestList } from '@/apis/test/test.ts';

import { useCoreQuery } from '../common/customQuery';

// 테스트 리스트 조회 API
export default function usePaginateTestList({ projectId, date, state, pageName, page }: TGetTestListRequest) {
  return useCoreQuery([QUERY_KEYS.DASHBOARD.TEST.LIST(projectId), date, state, pageName, page], () => getTestList({ projectId, date, state, pageName, page }), {
    placeholderData: keepPreviousData,
  });
}
