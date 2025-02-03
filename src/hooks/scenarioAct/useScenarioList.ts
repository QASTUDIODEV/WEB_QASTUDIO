import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { createScenario, getScenarioList } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation, useCoreQuery } from '@/hooks/common/customQuery';

import { setScenarioList } from '@/slices/scenarioActSlice';

export default function useScenarioList(characterId: number | null | undefined) {
  const dispatch = useDispatch();

  // 시나리오 리스트 가져오기
  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioList({ characterId: characterId! }), {
    enabled: !!characterId,
  });

  const useCreateScenario = useCoreMutation(createScenario);

  // Redux Store 업데이트
  useEffect(() => {
    if (useGetScenarioList.data?.result?.scenarios) {
      dispatch(setScenarioList(useGetScenarioList.data.result));
    }
  }, [useGetScenarioList.data, dispatch]);

  return { useGetScenarioList, useCreateScenario, refetchScenarioList: useGetScenarioList.refetch };
}
