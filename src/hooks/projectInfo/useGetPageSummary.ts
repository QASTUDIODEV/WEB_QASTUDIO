import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getPageSummaryList } from '@/apis/projectInfo/projectInfo';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useGetPageSummary(projectId: number) {
  return useCoreQuery(QUERY_KEYS.PAGE_SUMMARY({ projectId }), () => getPageSummaryList({ projectId }), { enabled: !!projectId });
}
