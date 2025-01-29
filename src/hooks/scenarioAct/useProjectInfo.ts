import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterList, getProjectInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useProjectInfo(projectId: number | undefined) {
  const useGetProjectInfo = useCoreQuery([QUERY_KEYS.GET_PROJECT_INFO, projectId], () => getProjectInfo({ projectId: projectId! }));
  const useGetCharacterList = useCoreQuery([QUERY_KEYS.GET_CHARACTER_LIST, projectId], () => getCharacterList({ projectId: projectId! }));

  return { useGetProjectInfo, useGetCharacterList };
}
