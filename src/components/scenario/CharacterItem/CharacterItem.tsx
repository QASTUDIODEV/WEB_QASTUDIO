import { useSelector } from 'react-redux';

import CharacterHeader from '@/components/scenario/CharacterHeader/CharacterHeader';
import * as S from '@/components/scenario/CharacterItem/CharacterItem.style';
import ScenarioItem from '@/components/scenario/ScenarioItem/ScenarioItem';

import type { TRootState } from '@/store/store';

export default function CharacterItem() {
  const characters = useSelector((state: TRootState) => state.scenario.characters);

  return (
    <div>
      {characters.map((character) => (
        <S.CharacterItem key={character.id}>
          <CharacterHeader
            characterId={character.id}
            title={character.title}
            createdBy={character.createdBy}
            createdAt={character.createdAt}
            isExpanded={character.isExpanded}
          />
          {character.isExpanded &&
            character.scenarios.map((scenario) => (
              <ScenarioItem
                key={scenario.id}
                characterId={character.id}
                scenarioId={scenario.id}
                name={scenario.name}
                createdBy={scenario.createdBy}
                createdAt={scenario.createdAt}
              />
            ))}
        </S.CharacterItem>
      ))}
    </div>
  );
}
