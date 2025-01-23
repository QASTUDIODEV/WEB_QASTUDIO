import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import CharacterSelectDropdown from '@/components/scenarioAct/characterSelectDropdown/characterSelectDropdown';
import * as S from '@/components/scenarioAct/controller/controller.style';
import ScenarioActModal from '@/components/scenarioAct/scenarioActModal/scenarioActModal';
import ScenarioDropdown from '@/components/scenarioAct/scenarioDropdown/scenarioDropdown';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/delete.svg?react';

export default function Controller() {
  //시나리오 가져오기
  const scenario = useSelector((state) => state.scenarioAct);
  const { isOpen } = useSelector((state) => state.modal);
  const onSelect = () => {
    console.log('ㅅㅌ됨');
  };
  return (
    <S.Container>
      {isOpen && <ScenarioActModal />}
      <S.Header>
        <Delete />
        <p>프로젝트 이름</p>
      </S.Header>

      <S.CharacterHeader>
        <p>Character</p>
        <CharacterSelectDropdown options={['user', 'admin']} onSelect={onSelect} />
      </S.CharacterHeader>

      <S.ScenarioLIst>
        {scenario.scenarios.map((scn) => (
          <ScenarioDropdown key={scn.scenarioId} scenarioId={scn.scenarioId} />
        ))}
      </S.ScenarioLIst>

      <S.ButtonContainer>
        <Button type="normal" color="gray" icon={<Add />} iconPosition="left">
          Scenario
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}
