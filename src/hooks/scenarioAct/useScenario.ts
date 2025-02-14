import { createScenario } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation } from '../common/customQuery';

export default function useScenario() {
  const useCreateScenario = useCoreMutation(createScenario);

  return { useCreateScenario };
}
