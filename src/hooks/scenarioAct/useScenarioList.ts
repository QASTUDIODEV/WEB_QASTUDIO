import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { createScenario, getScenarioList, patchScenarioInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation, useCoreQuery } from '@/hooks/common/customQuery';

export default function useScenarioList(characterId: number | null | undefined) {
  // 시나리오 리스트 가져오기
  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioList({ characterId: characterId! }), {
    enabled: characterId !== null && characterId !== undefined,
  });
  const refetchScenarioList = useGetScenarioList.refetch;

  // 시나리오 추가
  const useCreateScenario = useCoreMutation(createScenario, {
    onSuccess: () => {
      refetchScenarioList();
    },
  });

  //시나리오 편집
  const usePatchScenarioInfo = useCoreMutation(patchScenarioInfo, {
    onSuccess: () => {
      refetchScenarioList();
    },
  });

  return { useGetScenarioList, useCreateScenario, usePatchScenarioInfo, refetchScenarioList };
}
