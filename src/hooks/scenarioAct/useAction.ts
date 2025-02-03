import { editAction } from '@/apis/scenarioAct/scenarioAct';

import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import { useCoreMutation } from '../common/customQuery';

export default function useAction(characterId: number | null | undefined) {
  const { refetchScenarioList } = useScenarioList(characterId);

  const useEditAction = useCoreMutation(editAction, {
    onSuccess: () => {
      refetchScenarioList(); // ✅ 성공하면 시나리오 리스트 새로고침
    },
  });

  return { useEditAction };
}
