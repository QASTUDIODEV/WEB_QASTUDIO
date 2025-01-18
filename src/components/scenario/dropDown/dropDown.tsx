import { useState } from 'react';

import * as S from '@/components/scenario/dropDown/dropDown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({ options, onSelect, placeholder }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownHeader onClick={() => setIsOpen((prev) => !prev)}>
        {placeholder}
        {isOpen ? <ArrowDown /> : <ArrowUp />}
      </S.DropdownHeader>
      <S.DropdownList $isOpen={isOpen}>
        {options.map((option, index) => (
          <S.DropdownListItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </S.DropdownListItem>
        ))}
      </S.DropdownList>
    </S.DropdownContainer>
  );
}
