import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/scenarioAct/selectDropdown/selectDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  type?: 'thin' | 'normal';
}

export default function CharacterSelectDropdown({ options, onSelect, type = 'thin' }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedOption, setSelectedOption] = useState(options[0]); // 선택된 옵션
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열림 / 닫힘 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 옵션 선택 함수
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  // 외부 클릭시 닫힘
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
      <S.Header onClick={toggleDropdown} $isOpen={isOpen} $type={type}>
        {selectedOption}{' '}
        {isOpen ? (
          <S.IconContainer>
            <ArrowUp />
          </S.IconContainer>
        ) : (
          <S.IconContainer>
            <ArrowDown />
          </S.IconContainer>
        )}
      </S.Header>
      {/* 드롭다운 리스트 */}
      <S.DropdownList $isOpen={isOpen}>
        {options.map((option, index) => (
          <S.DropdownListItem key={index} onClick={() => handleOptionClick(option)} $isSelected={option === selectedOption} $type={type}>
            {option}
          </S.DropdownListItem>
        ))}
      </S.DropdownList>
    </S.Container>
  );
}
