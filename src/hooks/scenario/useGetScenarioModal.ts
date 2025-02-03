import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getAllPaths, patchCharacterScenario, postCharacterScenario } from '@/apis/scenario/scenario';

import { useCoreQuery } from '../common/customQuery';
import { useCoreAIMutation } from '../common/useAIcustonQuery';

type TScenarioInfoModalValue = {
  projectId: string;
};
export default function useGetScenarioModalInfo({ projectId }: TScenarioInfoModalValue) {
  const useGetAllPaths = useCoreQuery(QUERY_KEYS.GET_ALL_PATHS(projectId), () => getAllPaths(projectId), {
    enabled: !!projectId,
  });
  const usePostCharacter = useCoreAIMutation(postCharacterScenario);
  const usePatchCharacter = useCoreAIMutation(patchCharacterScenario);

  return { useGetAllPaths, usePostCharacter, usePatchCharacter };
}
