import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import CharacterHeader from '@/components/scenario/characterHeader/characterHeader';
import * as S from '@/components/scenario/characterList/characterList.style';
import ScenarioItem from '@/components/scenario/scenarioItem/scenarioItem';

export default function CharacterList() {
  const characters = useSelector((state) => state.scenario.characters);

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
