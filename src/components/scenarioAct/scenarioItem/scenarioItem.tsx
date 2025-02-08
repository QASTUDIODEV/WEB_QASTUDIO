import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useExecuteScenario from '@/hooks/scenarioAct/useExecuteScenario';
import useWebSocket from '@/hooks/scenarioAct/useWebsocket';

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

  // API 실행
  const { usePlayScenario } = useExecuteScenario();
  const { mutate: executeScenario } = usePlayScenario;

  // WebSocket 관리
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, isWebSocketActive);

  useEffect(() => {
    if (!project.webSocket.sessionId) return;

    console.log('WebSocket에서 받은 sessionId:', project.webSocket.sessionId);
    executeScenario({
      sessionId: project.webSocket.sessionId,
      scenarioId: scenario?.scenarioId || null,
      baseUrl: 'https://example.com',
    });
  }, [project.webSocket.sessionId, executeScenario, scenario]);

  const handlePlay = () => {
    if (!isWebSocketActive) {
      setIsWebSocketActive(true);
      return;
    }

    sendMessage('REQUEST_SESSION_ID');
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
