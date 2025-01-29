import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenarioList } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useCharacterInfo(characterId: number | null | undefined) {
  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioList({ characterId: characterId! }), {
    enabled: !!characterId,
  });

  return { useGetScenarioList };
}
