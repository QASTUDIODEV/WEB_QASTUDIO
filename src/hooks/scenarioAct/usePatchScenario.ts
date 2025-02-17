import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenarioInfo, patchScenarioInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation, useCoreQuery } from '@/hooks/common/customQuery';

export default function useFetchPageSource(scenarioid: number | null) {
  const useGetScenarioInfo = useCoreQuery([QUERY_KEYS.GET_SCENARIO_LIST, scenarioid], () => getScenarioInfo({ scenarioId: scenarioid }), {
    enabled: !!scenarioid,
  });

  const usePatchScenarioInfo = useCoreMutation(patchScenarioInfo);

  return { usePatchScenarioInfo, useGetScenarioInfo };
}
