import { useDispatch } from 'react-redux';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenarioInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

import { setScenarioList } from '@/slices/scenarioActSlice';

export default function useScenarioList(characterId: number | null | undefined) {
  const dispatch = useDispatch();

  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioInfo({ characterId: characterId! }), {
    enabled: !!characterId,
    select: (data) => {
      if (data?.result?.scenarios) {
        dispatch(setScenarioList(data?.result?.scenarios));
      }
      return data;
    },
  });

  return { useGetScenarioList };
}
