import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioItem/scenarioItem.style';

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
        {scenario?.isOpen ? (
          <S.IconContainer>
            <ArrowUp />
          </S.IconContainer>
        ) : (
          <S.IconContainer>
            <ArrowDown />
          </S.IconContainer>
        )}
        <S.Title>{scenario?.scenarioName || '타이틀'}</S.Title>
        <S.IconContainer>
          <Play />
        </S.IconContainer>
      </S.ScenarioHeader>

      {scenario?.isOpen && (
        <div>
          <S.ActionDescription># {scenario.scenarioDescription}</S.ActionDescription>
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
