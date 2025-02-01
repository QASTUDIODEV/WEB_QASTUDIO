import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { deleteCharacter, deleteScenario } from '@/apis/scenario/scenario';

// import { queryClient } from '../../apis/queryClient';
import { useCoreQuery } from '../common/customQuery';

type TScenarioEditValue = {
  characterId: number[];
  scenarioId: number[];
};
export default function useEditSceanrio({ characterId, scenarioId }: TScenarioEditValue) {
  const useDeleteSceanrio = useCoreQuery(QUERY_KEYS.DELETE_SCEANRIO, () => deleteScenario(scenarioId));
  const useDeleteCharacter = useCoreQuery(QUERY_KEYS.DELETE_CHARACTER, () => deleteCharacter(characterId));

  return { useDeleteSceanrio, useDeleteCharacter };
}
