import { deleteCharacter, deleteScenario } from '@/apis/scenario/scenario';

import { useCoreMutation } from '../common/customQuery';

export default function useEditSceanrio() {
  const useDeleteSceanrio = useCoreMutation(deleteScenario);
  const useDeleteCharacter = useCoreMutation(deleteCharacter);

  return { useDeleteSceanrio, useDeleteCharacter };
}
