import { QUERY_KEYS } from '@/constants/querykeys/queryKeys.ts';

import { getProjectInfo } from '@/apis/projectInfo/projectInfo.ts';

import { useCoreQuery } from '@/hooks/common/customQuery.ts';

export default function useProjectExtractInfo(projectId: number) {
  return useCoreQuery(QUERY_KEYS.PROJECT_INFO({ projectId }), () => getProjectInfo({ projectId }), {
    enabled: !!projectId,
  });
}
