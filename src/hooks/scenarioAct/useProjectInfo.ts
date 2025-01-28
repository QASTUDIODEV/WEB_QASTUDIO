import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getProjectInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useProjectInfo(projectId: string | undefined) {
  const useGetProjectInfo = useCoreQuery([QUERY_KEYS.GET_PROJECT_INFO, projectId], () => getProjectInfo({ projectId: projectId! }));

  return { useGetProjectInfo };
}
