import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioDropdown/scenarioDropdown.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { openScenario } from '@/slices/scenarioActSlice';

interface IScenarioDropdownProp {
  scenarioId: number;
}

export default function ScenarioDropdown({ scenarioId }: IScenarioDropdownProp) {
  const dispatch = useDispatch();
  const scenario = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId));

  const toggleDropdown = () => {
    dispatch(openScenario(scenarioId));
  };

  return (
    <S.Container>
      <S.ScenarioHeader onClick={toggleDropdown} $isOpen={scenario?.isOpen}>
        {scenario?.isOpen ? <ArrowUp /> : <ArrowDown />}
        <S.Title>{scenario?.name || '타이틀'}</S.Title>
        <Play />
      </S.ScenarioHeader>

      {scenario?.isOpen && (
        <div>
          <S.ActionDescription># 사용자가 로그인 페이지로 이동하고 로그인한다.</S.ActionDescription>
          <S.ActionList>
            {scenario.actions.map((act) => (
              <ActionItem key={act.actionId} scenarioId={scenarioId} actionId={act.actionId} />
            ))}
          </S.ActionList>
        </div>
      )}
    </S.Container>
  );
}
