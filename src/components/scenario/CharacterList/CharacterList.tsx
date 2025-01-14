import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import CharacterHeader from '@/components/scenario/CharacterHeader/CharacterHeader';
import * as S from '@/components/scenario/CharacterList/CharacterList.style';
import ScenarioItem from '@/components/scenario/ScenarioItem/ScenarioItem';

import type { ICharacter } from '@/slices/scenarioSlice';

export default function CharacterList() {
  const characters: ICharacter[] = useSelector((state) => state.scenario.characters);

  return (
    <div>
      {characters.map((character, idx) => (
        <S.CharacterItem key={character.id}>
          <CharacterHeader characterId={character.id} idx={idx} />
          {character.isExpanded &&
            character.scenarios.map((scenario) => <ScenarioItem key={scenario.id} characterId={character.id} scenarioId={scenario.id} />)}
        </S.CharacterItem>
      ))}
    </div>
  );
}
