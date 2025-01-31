import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import AddInputForm from '@/components/scenarioAct/addInputForm/addInputForm';
import CharacterSelectDropdown from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown';
import * as S from '@/components/scenarioAct/controller/controller.style';
import ScenarioActModal from '@/components/scenarioAct/scenarioActModal/scenarioActModal';
import ScenarioItem from '@/components/scenarioAct/scenarioItem/scenarioItem';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/delete.svg?react';
import { setCharacterId } from '@/slices/scenarioActSlice';

export default function Controller() {
  const dispatch = useDispatch();
  const scenario = useSelector((state) => state.scenarioAct);
  const { isOpen } = useSelector((state) => state.modal);
  const [step, setStep] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState(scenario.characters[0] || null);

  // 드롭다운 함수
  const onSelect = (selected: { characterId: number; characterName: string }) => {
    setSelectedCharacter(selected);
  };
  useEffect(() => {
    if (selectedCharacter) {
      dispatch(setCharacterId(selectedCharacter.characterId));
    }
  }, [selectedCharacter, dispatch]);

  // 스텝 함수
  const handleStep = (selectedStep: number) => {
    setStep(selectedStep);
  };
  console.log(scenario.characters);
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
              <CharacterSelectDropdown options={scenario.characters} onSelect={onSelect} />
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
