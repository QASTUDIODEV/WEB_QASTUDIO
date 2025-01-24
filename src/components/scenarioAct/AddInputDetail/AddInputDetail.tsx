import { useState } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/AddInputDetail/AddInputDetail.style';

import ThinDropdown from '../thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';

export default function AddInputDetail() {
  // 스텝 - write directly: 1, record: 2
  const [step, setStep] = useState(1);
  // 스텝 함수
  const handleStep = (selectedStep: number) => {
    setStep(selectedStep);
  };

  return (
    <S.Container>
      <S.SelectToggle>
        <S.Select $active={step === 1} onClick={() => handleStep(1)}>
          write directly
        </S.Select>
        <S.Select $active={step === 2} onClick={() => handleStep(2)}>
          record
        </S.Select>
      </S.SelectToggle>

      <S.DetailContainer>
        <Input placeholder="Enter action title." type="thin" />
        <ThinDropdown options={['gd', 'dd']} onSelect={() => {}} placeholder="select action" />
        <S.DividInputContainer>
          <ThinDropdown options={['gd', 'dd']} onSelect={() => {}} placeholder="select action" />
          <Input placeholder="enter key" type="thin" />
        </S.DividInputContainer>
        <S.AddButton>
          <Add />
        </S.AddButton>
      </S.DetailContainer>
      <S.ButtonContainer>
        <Button type="normal" color="gray">
          Save
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}
