import type { TGetStatisticsRequest } from '@/types/test/test';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getStatistics } from '@/apis/test/test';

import { useCoreQuery } from '../common/customQuery';

// 테스트 통계 조회 API
export default function useGetStatistics({ projectId }: TGetStatisticsRequest) {
  return useCoreQuery([QUERY_KEYS.DASHBOARD.TEST.STATISTICS(projectId)], () => getStatistics({ projectId }));
}
