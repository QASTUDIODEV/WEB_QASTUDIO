import { editAction } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation } from '../common/customQuery';

export default function useAction() {
  const useEditAction = useCoreMutation(editAction);

  return { useEditAction };
}
