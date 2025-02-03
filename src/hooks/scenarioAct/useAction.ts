import { editAction } from '@/apis/scenarioAct/scenarioAct';

import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import { useCoreMutation } from '../common/customQuery';

export default function useAction(characterId: number | null | undefined) {
  const { refetchScenarioList } = useScenarioList(characterId);

  const useEditAction = useCoreMutation(editAction, {
    onSuccess: () => {
      refetchScenarioList();
    },
  });

  return { useEditAction };
}
