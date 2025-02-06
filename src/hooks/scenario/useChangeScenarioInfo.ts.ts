import { deleteCharacter, deleteScenario, patchCharacterScenario, postCharacterScenario } from '@/apis/scenario/scenario';

import { useCoreMutation } from '../common/customQuery';
import { useCoreAIMutation } from '../common/useAIcustonQuery';

export default function useChangeScenarioInfo() {
  const useDeleteSceanrio = useCoreMutation(deleteScenario);
  const useDeleteCharacter = useCoreMutation(deleteCharacter);
  const usePostCharacter = useCoreAIMutation(postCharacterScenario);
  const usePatchCharacter = useCoreAIMutation(patchCharacterScenario);

  return { useDeleteSceanrio, useDeleteCharacter, usePostCharacter, usePatchCharacter };
}
