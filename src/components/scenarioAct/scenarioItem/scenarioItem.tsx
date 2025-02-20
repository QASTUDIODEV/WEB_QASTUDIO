import { useEffect } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useExecuteScenario from '@/hooks/scenarioAct/useExecuteScenario';

import LoadingSpinner from '@/components/common/loading/loadingSpinner';
import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioItem/scenarioItem.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { openScenario, setCurrentTestId, setRunningScenario, setScenarioId, setStep, setWebSocketConnected } from '@/slices/scenarioActSlice';

interface IScenarioItemProp {
  scenarioId: number;
}

export default function scenarioItem({ scenarioId }: IScenarioItemProp) {
  const dispatch = useDispatch();
  const scenario = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId));
  const project = useSelector((state) => state.scenarioAct);
  const runningScenarioId = useSelector((state) => state.scenarioAct.webSocket.runningScenarioId);

  // API 실행
  const { usePlayScenario } = useExecuteScenario();
  const { mutate: executeScenario } = usePlayScenario;

  // 웹소켓 실행
  useEffect(() => {
    if (!project.webSocket.sessionId || !project.webSocket.isConnected) return;
    if (runningScenarioId === scenarioId) {
      console.log(`🔹 WebSocket에서 받은 sessionId: ${project.webSocket.sessionId}, 실행할 시나리오: ${scenarioId}`);

      executeScenario(
        {
          sessionId: project.webSocket.sessionId,
          scenarioId,
          baseUrl: project.projectUrl,
        },
        {
          onSuccess: (data) => {
            dispatch(setCurrentTestId(data.result.testId));
          },
        },
      );
    }
  }, [project.webSocket.sessionId, runningScenarioId, executeScenario, scenarioId]);

  // Play 버튼
  const handlePlay = () => {
    dispatch(setWebSocketConnected(true));
    setTimeout(() => {
      dispatch(setRunningScenario(scenarioId));
    }, 100); // 상태 반영 후 실행되도록
  };

  const handleEdit = (newStep: number, id?: number) => {
    dispatch(setStep(newStep));
    if (id !== undefined) {
      dispatch(setScenarioId(id));
    }
  };

  const handleOpen = () => {
    dispatch(openScenario(scenarioId));
  };

  return (
    <S.Container>
      <S.ScenarioHeader $isOpen={scenario?.isOpen}>
        <S.HeadDivider>
          <S.IconContainer onClick={handleOpen}>{scenario?.isOpen ? <ArrowUp /> : <ArrowDown />}</S.IconContainer>
          <S.Title>{scenario?.scenarioName}</S.Title>
        </S.HeadDivider>
        <S.HeadDivider>
          <S.IconContainer>
            <Edit onClick={() => handleEdit(3, scenarioId)} />
          </S.IconContainer>
          <S.IconContainer>{scenarioId == runningScenarioId ? <LoadingSpinner /> : <Play onClick={handlePlay} />}</S.IconContainer>
        </S.HeadDivider>
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
