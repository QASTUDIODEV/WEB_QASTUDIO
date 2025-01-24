import { useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import AddInputDetail from '@/components/scenarioAct/AddInputDetail/AddInputDetail';
import AddInputForm from '@/components/scenarioAct/AddInputForm/AddInputForm';
import CharacterSelectDropdown from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown';
import * as S from '@/components/scenarioAct/controller/controller.style';
import ScenarioActModal from '@/components/scenarioAct/scenarioActModal/scenarioActModal';
import ScenarioDropdown from '@/components/scenarioAct/scenarioDropdown/scenarioDropdown';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/delete.svg?react';

export default function Controller() {
  // 스텝 - 시나리오 실행: 1, 시나리오 추가: 2
  const [step, setStep] = useState<number>(1);
  //시나리오 가져오기
  const scenario = useSelector((state) => state.scenarioAct);
  //모달
  const { isOpen } = useSelector((state) => state.modal);

  //드롭다운 함수
  const onSelect = () => {
    console.log('ㅅㅌ됨');
  };
  // 스텝 함수
  const handleStep = (selectedStep: number) => {
    setStep(selectedStep);
  };
  return (
    <S.Container>
      {step == 1 ? (
        /* 시나리오 실행 */
        <S.ActContainer>
          {isOpen && <ScenarioActModal />}
          <S.Header>
            <br />
            <p>프로젝트 이름</p>
          </S.Header>

          <S.CharacterHeader>
            <p>Character</p>
            <S.DropdownContainer>
              <CharacterSelectDropdown options={['user', 'admin']} onSelect={onSelect} />
            </S.DropdownContainer>
          </S.CharacterHeader>

          <S.ScenarioLIst>
            {scenario.scenarios.map((scn) => (
              <ScenarioDropdown key={scn.scenarioId} scenarioId={scn.scenarioId} />
            ))}
          </S.ScenarioLIst>

          <S.ButtonContainer>
            <Button type="normal" color="gray" icon={<Add />} iconPosition="left" onClick={() => handleStep(1)}>
              Scenario
            </Button>
          </S.ButtonContainer>
        </S.ActContainer>
      ) : (
        /* 시나리오 추가 */
        <S.AddContainer>
          <S.Header>
            <Delete onClick={() => handleStep(2)} style={{ cursor: 'pointer' }} />
            <p>Add Senario</p>
          </S.Header>

          <AddInputForm />

          <AddInputDetail />
        </S.AddContainer>
      )}
    </S.Container>
  );
}
