import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioDropdown/scenarioDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import Pause from '@/assets/icons/pause.svg?react';
import Play from '@/assets/icons/play.svg?react';

export default function ScenarioDropdown() {
  return (
    <S.Container>
      <S.ScenarioHeader>
        <ArrowDown />
        <S.Title>Memo</S.Title>
        <Play />
      </S.ScenarioHeader>
      <S.ActionList>
        <S.ActionDescription># 사용자가 로그인 페이지로 이동하고 로그인한다.</S.ActionDescription>
        <ActionItem />
      </S.ActionList>
    </S.Container>
  );
}
