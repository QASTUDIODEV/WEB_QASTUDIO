import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/scenarioAct/thinDropdown/thinDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function ThinDropdown({ options, onSelect, placeholder }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false); //오픈
  const [selected, setSelected] = useState<string | null>(null); //선택된
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
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
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownHeader onClick={() => setIsOpen((prev) => !prev)} $hasSelection={!!selected} $isOpen={isOpen}>
        {selected || placeholder || 'Select an option'}
        {isOpen ? <ArrowUp /> : <ArrowDown />}
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
