import { useState } from 'react';

import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioDropdown/scenarioDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Play from '@/assets/icons/play.svg?react';

export default function ScenarioDropdown() {
  const [isOpen, setIsOpen] = useState(false); // 열림/닫힘 상태 관리

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Container>
      <S.ScenarioHeader onClick={toggleDropdown} $isOpen={isOpen}>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
        <S.Title>Memo</S.Title>
        <Play />
      </S.ScenarioHeader>

      {isOpen && (
        <S.ActionList>
          <S.ActionDescription># 사용자가 로그인 페이지로 이동하고 로그인한다.</S.ActionDescription>
          <ActionItem />
          <ActionItem />
          <ActionItem />
        </S.ActionList>
      )}
    </S.Container>
  );
}
