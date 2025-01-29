import { useState } from 'react';

import { useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import AddInputForm from '@/components/scenarioAct/addInputForm/addInputForm';
import * as S from '@/components/scenarioAct/controller/controller.style';
import ScenarioActModal from '@/components/scenarioAct/scenarioActModal/scenarioActModal';
import ScenarioItem from '@/components/scenarioAct/scenarioItem/scenarioItem';
import SelectDropdown from '@/components/scenarioAct/selectDropdown/selectDropdown';

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
          {/* 헤더 */}
          <S.Header>
            <br />
            <p>{scenario.projectName}</p>
          </S.Header>
          {/* 역할 선택 */}
          <S.CharacterHeader>
            <p>Character</p>
            <S.DropdownContainer>
              <SelectDropdown options={scenario.characters.map((char) => char.characterName)} onSelect={onSelect} />
            </S.DropdownContainer>
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
      ) : (
        /* 시나리오 추가 */
        <S.AddContainer>
          {/* 헤더 */}
          <S.Header>
            <Delete onClick={() => handleStep(1)} style={{ cursor: 'pointer' }} />
            <p>Add Scenario</p>
          </S.Header>
          {/* 수많은 인풋들 */}
          <AddInputForm />
        </S.AddContainer>
      )}
    </S.Container>
  );
}
