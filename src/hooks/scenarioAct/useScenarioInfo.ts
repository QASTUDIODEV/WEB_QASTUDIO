import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenarioInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

export default function useScenarioInfo(scenarioId: number | undefined) {
  const useGetScenarioInfo = useCoreQuery([QUERY_KEYS.GET_SCENARIO_INFO, scenarioId], () => getScenarioInfo({ projectId: scenarioId! }));

  return { useGetScenarioInfo };
}
