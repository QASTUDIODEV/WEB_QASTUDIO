import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterList } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useCharacterList(projectId: string | undefined) {
  const useGetCharacterList = useCoreQuery([QUERY_KEYS.GET_CHARACTER_LIST, projectId], () => getCharacterList({ projectId: projectId! }));
  return { useGetCharacterList };
}
