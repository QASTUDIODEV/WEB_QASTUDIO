import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { createScenario, getScenarioList } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation, useCoreQuery } from '@/hooks/common/customQuery';

export default function useScenarioList(characterId: number | null | undefined) {
  // 시나리오 리스트 가져오기
  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioList({ characterId: characterId! }), {
    enabled: !!characterId,
  });

  const useCreateScenario = useCoreMutation(createScenario);

  return { useGetScenarioList, useCreateScenario, refetchScenarioList: useGetScenarioList.refetch };
}
