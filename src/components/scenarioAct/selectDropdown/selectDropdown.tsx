import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/scenarioAct/selectDropdown/selectDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: string[];
  initialValue: string;
  onSelect: (option: string) => void;
  type?: 'thin' | 'normal';
}

export default function SelectDropdown({ options, initialValue, onSelect, type = 'thin' }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.Container ref={dropdownRef}>
      <S.Header onClick={toggleDropdown} $isOpen={isOpen} $type={type}>
        {selectedOption}
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
      <S.DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <S.DropdownListItem key={option} onClick={() => handleOptionClick(option)} $isSelected={option === selectedOption} $type={type}>
            {option}
          </S.DropdownListItem>
        ))}
      </S.DropdownList>
    </S.Container>
  );
}
