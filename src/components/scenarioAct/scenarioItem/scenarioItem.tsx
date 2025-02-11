import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useExecuteScenario from '@/hooks/scenarioAct/useExecuteScenario';
import useWebSocket from '@/hooks/scenarioAct/useWebsocket';

import ActionItem from '@/components/scenarioAct/actionItem/actionItem';
import * as S from '@/components/scenarioAct/scenarioItem/scenarioItem.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { openScenario, setRunningScenario } from '@/slices/scenarioActSlice';

interface IScenarioDropdownProp {
  scenarioId: number;
}

export default function ScenarioDropdown({ scenarioId }: IScenarioDropdownProp) {
  const dispatch = useDispatch();
  const scenario = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId));
  const project = useSelector((state) => state.scenarioAct);

  // 현재 실행 중인 시나리오 ID 가져오기
  const runningScenarioId = useSelector((state) => state.scenarioAct.webSocket.runningScenarioId);

  // API 실행
  const { usePlayScenario } = useExecuteScenario();
  const { mutate: executeScenario } = usePlayScenario;

  // WebSocket 관리
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, isWebSocketActive);

  // WebSocket 메시지 수신 시, 현재 실행 중인 시나리오와 비교
  useEffect(() => {
    if (!project.webSocket.sessionId || runningScenarioId !== scenarioId) return;
    console.log(`🔹 WebSocket에서 받은 sessionId: ${project.webSocket.sessionId}, 실행할 시나리오: ${scenarioId}`);

    executeScenario({
      sessionId: project.webSocket.sessionId,
      scenarioId,
      baseUrl: 'https://example.com',
    });

    // 실행 후 실행 중인 시나리오 ID 초기화
    dispatch(setRunningScenario(null));
  }, [project.webSocket.sessionId, runningScenarioId, executeScenario, scenarioId, dispatch]);

  // Play 버튼 클릭 시 실행 중인 시나리오 ID 설정
  const handlePlay = () => {
    // 실행 중인 시나리오 설정
    setIsWebSocketActive(true);
    dispatch(setRunningScenario(scenarioId));
  };

  const handleOpen = () => {
    dispatch(openScenario(scenarioId));
  };

  return (
    <S.Container>
      <S.ScenarioHeader $isOpen={scenario?.isOpen}>
        <S.IconContainer onClick={handleOpen}>{scenario?.isOpen ? <ArrowUp /> : <ArrowDown />}</S.IconContainer>
        <S.Title>{scenario?.scenarioName}</S.Title>
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
