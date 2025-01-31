import type { TCharacterId } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getScenario } from '@/apis/projectInfo/projectInfo';

import { useCoreQuery } from '../common/customQuery';

export function useGetScenario({ characterId }: TCharacterId) {
  const useScenario = useCoreQuery(QUERY_KEYS.SCENARIO({ characterId }), () => getScenario({ characterId }), {
    enabled: !!characterId,
    staleTime: 5 * 60 * 1000,
  });
  return { useScenario };
}
