import { useDispatch } from 'react-redux';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenarioList } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

import { setScenarioList } from '@/slices/scenarioActSlice';

export default function useCharacterInfo(characterId: number | null | undefined) {
  const dispatch = useDispatch();

  const useGetScenarioList = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, characterId], () => getScenarioList({ characterId: characterId! }), {
    enabled: !!characterId,
    select: (data) => {
      if (data?.result?.scenarioList) {
        dispatch(setScenarioList(data.result.scenarioList));
      }
      return data;
    },
  });

  return { useGetScenarioList };
}
