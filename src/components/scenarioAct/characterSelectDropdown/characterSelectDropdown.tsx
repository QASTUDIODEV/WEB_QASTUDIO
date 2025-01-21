import { useState } from 'react';

import * as S from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';

interface IDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function CharacterSelectDropdown({ options, onSelect }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedOption, setSelectedOption] = useState(options[0]); // 선택된 옵션

  // 드롭다운 열림 / 닫힘 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 옵션 선택 함수
  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    onSelect(option); // 부모 컴포넌트에 선택된 옵션 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <S.Container $isOpen={isOpen}>
      {/* 선택된 옵션 및 드롭다운 토글 버튼 */}
      <S.Content onClick={toggleDropdown}>
        {selectedOption} <ArrowDown />
      </S.Content>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <S.Dropdown>
          {options.map((option, index) => (
            <S.Option key={index} onClick={() => handleOptionClick(option)} $isSelected={option === selectedOption}>
              {option}
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.Container>
  );
}
