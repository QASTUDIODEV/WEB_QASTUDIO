import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import * as S from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import { setCharacterId } from '@/slices/scenarioActSlice';

export default function CharacterSelectDropdown() {
  const dispatch = useDispatch();

  const characters = useSelector((state) => state.scenarioAct.characters);
  const selectedCharacterId = useSelector((state) => state.scenarioAct.characterId);
  const selectedCharacter = characters.find((char) => char.characterId === selectedCharacterId) || characters[0];

  // 드롭다운 열림/닫힘
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { refetchScenarioList } = useScenarioList(selectedCharacterId);

  useEffect(() => {
    if (selectedCharacter) {
      dispatch(setCharacterId(selectedCharacter.characterId));
      refetchScenarioList();
    }
  }, [selectedCharacterId, dispatch, refetchScenarioList]);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 캐릭터 선택 함수
  const handleOptionClick = (characterId: number) => {
    setIsOpen(false);
    dispatch(setCharacterId(characterId));
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.Container ref={dropdownRef}>
      {/* 헤더 */}
      <S.Header onClick={toggleDropdown} $isOpen={isOpen}>
        {selectedCharacter?.characterName || 'Select Character'} {isOpen ? <ArrowUp /> : <ArrowDown />}
      </S.Header>

      {/* 드롭다운 리스트 */}
      <S.DropdownList $isOpen={isOpen}>
        {characters.map((char) => (
          <S.DropdownListItem key={char.characterId} onClick={() => handleOptionClick(char.characterId)} $isSelected={char.characterId === selectedCharacterId}>
            {char.characterName}
          </S.DropdownListItem>
        ))}
      </S.DropdownList>
    </S.Container>
  );
}
