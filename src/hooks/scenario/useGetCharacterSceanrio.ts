import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterScenarioList } from '@/apis/scenario/scenario';

import { useCoreQuery } from '../common/customQuery';

type TCharacterScenarioValue = {
  characterId: number;
};
export default function useGetCharacterScenarioInfo({ characterId }: TCharacterScenarioValue) {
  const useGetCharacterScenarioList = useCoreQuery(QUERY_KEYS.GET_CHARACTER_SCEANRIOS_LIST(characterId), () => getCharacterScenarioList(characterId), {
    enabled: characterId !== -1,
  });

  return { useGetCharacterScenarioList };
}
