import React, { useState } from 'react';

import type { TDetailCharacters } from '@/types/scenario/scenario';

import CharacterHeader from '@/components/scenario/characterHeader/characterHeader';
import * as S from '@/components/scenario/characterList/characterList.style';
import ScenarioItem from '@/components/scenario/scenarioItem/scenarioItem';

type TCharacterListProps = {
  character: TDetailCharacters;
  selectedIdx: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
};

export default function CharacterList({ character, selectedIdx, setSelectedIdx }: TCharacterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <S.CharacterItem key={character.characterId} onClick={() => setSelectedIdx(character.characterId)}>
      <CharacterHeader characterData={character} isExpanded={isExpanded} setIsExpanded={setIsExpanded} isSelected={selectedIdx === character.characterId} />
      {isExpanded &&
        character.scenarios !== undefined &&
        character.scenarios?.scenarioList.map((scenario) => (
          <ScenarioItem key={scenario.scenarioId} characterId={character.characterId} scenarioData={scenario} />
        ))}
    </S.CharacterItem>
  );
}
