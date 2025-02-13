import { executeScenario } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation } from '../common/customQuery';

export default function useExecuteScenario() {
  const usePlayScenario = useCoreMutation(executeScenario);

  return { usePlayScenario };
}
