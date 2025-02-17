import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useWebSocket from '@/hooks/scenarioAct/useWebsocket';

import Button from '@/components/common/button/button';
import AddInputForm from '@/components/scenarioAct/addInputForm/addInputForm';
import CharacterSelectDropdown from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown';
import * as S from '@/components/scenarioAct/controller/controller.style';
import ModifyInputForm from '@/components/scenarioAct/modifyInputForm/modifyInputForm';
import ScenarioItem from '@/components/scenarioAct/scenarioItem/scenarioItem';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/delete.svg?react';
import Exit from '@/assets/icons/exit.svg?react';
import { setScenarioId, setStep } from '@/slices/scenarioActSlice';

export default function Controller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scenario = useSelector((state) => state.scenarioAct);
  const step = useSelector((state) => state.scenarioAct.step);

  useWebSocket(import.meta.env.VITE_WEBSOCKET_URL);

  // 스텝 함수
  const handleStep = (newStep: number, scenarioId?: number) => {
    dispatch(setStep(newStep));
    if (scenarioId !== undefined) {
      dispatch(setScenarioId(scenarioId));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <S.Container>
      {step.step === 1 ? (
        /* 시나리오 실행 */
        <S.ActContainer>
          {/* 헤더 */}
          <S.Header>
            <p>{scenario.projectName}</p>
            <S.IconContainer>
              <Exit onClick={handleGoBack} />
            </S.IconContainer>
          </S.Header>

          {/* 역할 선택 */}
          <S.CharacterHeader>
            <p>Character</p>
            <CharacterSelectDropdown />
          </S.CharacterHeader>

          {/* 시나리오 리스트 */}
          <S.ScenarioLIst>
            {scenario.scenarios.map((scn) => (
              <ScenarioItem key={scn.scenarioId} scenarioId={scn.scenarioId} />
            ))}
          </S.ScenarioLIst>

          {/* 시나리오 추가 버튼 */}
          <S.ButtonContainer>
            <Button type="normal" color="default" icon={<Add />} iconPosition="left" onClick={() => handleStep(2)}>
              Scenario
            </Button>
          </S.ButtonContainer>
        </S.ActContainer>
      ) : step.step == 2 ? (
        /* 시나리오 추가 */
        <S.AddContainer>
          {/* 헤더 */}
          <S.Header>
            <S.IconContainer>
              <Delete onClick={() => handleStep(1)} style={{ cursor: 'pointer' }} />
            </S.IconContainer>
            <p>Add Scenario</p>
          </S.Header>

          {/*인풋들 */}
          <AddInputForm />
        </S.AddContainer>
      ) : (
        /* 시나리오 편집 */
        <S.AddContainer>
          {/* 헤더 */}
          <S.Header>
            <S.IconContainer>
              <Delete onClick={() => handleStep(1)} style={{ cursor: 'pointer' }} />
            </S.IconContainer>
            <p>Modify Senario</p>
          </S.Header>

          {/*인풋들 */}
          <ModifyInputForm />
        </S.AddContainer>
      )}
    </S.Container>
  );
}
