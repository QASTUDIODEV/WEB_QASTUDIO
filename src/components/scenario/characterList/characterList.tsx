import React, { useState } from 'react';

import type { TDetailCharacters } from '@/types/scenario/scenario';

import CharacterHeader from '@/components/scenario/characterHeader/characterHeader';
import * as S from '@/components/scenario/characterList/characterList.style';
import ScenarioItem from '@/components/scenario/scenarioItem/scenarioItem';

type TCharacterListProps = {
  character: TDetailCharacters;
  selectedIdx: { isCharacter: boolean; idx: number };
  setSelectedIdx: React.Dispatch<React.SetStateAction<{ isCharacter: boolean; idx: number }>>;
};

export default function CharacterList({ character, selectedIdx, setSelectedIdx }: TCharacterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <S.CharacterItem key={character.characterId}>
      <CharacterHeader
        setSelectedIdx={setSelectedIdx}
        characterData={character}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isSelected={selectedIdx.idx === character.characterId && selectedIdx.isCharacter}
      />
      {isExpanded &&
        character.scenarios !== undefined &&
        character.scenarios?.scenarioList.map((scenario) => (
          <ScenarioItem
            key={scenario.scenarioId}
            characterId={character.characterId}
            scenarioData={scenario}
            isSelected={selectedIdx.idx === scenario.scenarioId && !selectedIdx.isCharacter}
            setSelectedIdx={setSelectedIdx}
          />
        ))}
    </S.CharacterItem>
  );
}
