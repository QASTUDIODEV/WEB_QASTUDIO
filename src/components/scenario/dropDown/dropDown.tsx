import { useEffect, useRef, useState } from 'react';

import type { TProjectPath } from '@/types/scenario/scenario';

import useClickOutside from '@/hooks/common/useClickOutside';

import * as S from '@/components/scenario/dropDown/dropDown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: TProjectPath[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({ options, onSelect, placeholder }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownHeader onClick={() => setIsOpen((prev) => !prev)}>
        {placeholder || 'Select an option'}
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </S.DropdownHeader>
      <S.DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <S.DropdownListItem key={option.pageId} onClick={() => handleSelect(option.path)}>
            {option.path}
          </S.DropdownListItem>
        ))}
      </S.DropdownList>
    </S.DropdownContainer>
  );
}
