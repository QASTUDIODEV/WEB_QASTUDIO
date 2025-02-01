import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { GetAllPaths, patchCharacterScenario, postCharacterScenario } from '@/apis/scenario/scenario';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

type TScenarioInfoModalValue = {
  projectId: string;
};
export default function useGetScenarioModalInfo({ projectId }: TScenarioInfoModalValue) {
  const useGetAllPaths = useCoreQuery(QUERY_KEYS.GET_ALL_PATHS(projectId), () => GetAllPaths(projectId));
  const usePostCharacter = useCoreMutation(postCharacterScenario);
  const usePatchCharacter = useCoreMutation(patchCharacterScenario);

  return { useGetAllPaths, usePostCharacter, usePatchCharacter };
}
