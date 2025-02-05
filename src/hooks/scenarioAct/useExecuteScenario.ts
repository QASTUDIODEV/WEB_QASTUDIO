import { executeScenario } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation } from '../common/customQuery';

export default function useScenario() {
  const useExecuteScenario = useCoreMutation(executeScenario);

  return { useExecuteScenario };
}
