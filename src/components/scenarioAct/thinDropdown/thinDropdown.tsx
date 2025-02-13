import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/scenarioAct/thinDropdown/thinDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';

interface IDropdownProps {
  options: string[];
  onSelect?: (value: string) => void;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function ThinDropdown({ options, onSelect, placeholder, value, onChange }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // 오픈 상태
  const [selected, setSelected] = useState<string | null>(value || null); // 선택된 값
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange?.(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelected(value || null); // 외부 값 변경 시 동기화
  }, [value]);

  // 외부 클릭 시 닫기
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
      {/* 헤더 */}
      <S.DropdownHeader onClick={() => setIsOpen((prev) => !prev)} $hasSelection={!!selected} $isOpen={isOpen}>
        {selected || placeholder || 'Select an option'}
        {isOpen ? (
          <S.IconContainer>
            <ArrowUp />
          </S.IconContainer>
        ) : (
          <S.IconContainer>
            <ArrowDown />
          </S.IconContainer>
        )}
      </S.DropdownHeader>

      {/* 드롭다운 리스트 */}
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
