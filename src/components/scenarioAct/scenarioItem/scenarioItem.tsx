import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useExecuteScenario from '@/hooks/scenarioAct/useExecuteScenario';

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
  const project = useSelector((state) => state.scenarioAct);

  const { usePlayScenario } = useExecuteScenario();
  const { mutate: executeScenario } = usePlayScenario;
  const handlePlay = () => {
    executeScenario({
      sessionId: project.sessionId,
      scenarioId: scenario?.scenarioId || null,
      baseUrl: project.projectUrl,
    });
  };

  const handleOpen = () => {
    dispatch(openScenario(scenarioId));
  };
  return (
    <S.Container>
      <S.ScenarioHeader $isOpen={scenario?.isOpen}>
        <S.IconContainer onClick={handleOpen}>{scenario?.isOpen ? <ArrowUp /> : <ArrowDown />}</S.IconContainer>
        <S.Title>{scenario?.scenarioName || '타이틀'}</S.Title>
        <S.IconContainer>
          <Play onClick={handlePlay} />
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
