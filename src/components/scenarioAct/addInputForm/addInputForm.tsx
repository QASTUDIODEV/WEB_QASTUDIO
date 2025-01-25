import { useState } from 'react';

import { ACTION_TYPE } from '@/enums/enums';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/addInputForm/addInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';

export default function AddInputForm() {
  // 스텝 - write directly: 1, record: 2
  const [step, setStep] = useState(1);
  // 스텝 함수
  const handleStep = (selectedStep: number) => {
    setStep(selectedStep);
  };
  return (
    <S.Container>
      <S.InputContainer>
        <S.InputTitle>Title</S.InputTitle>
        <Input placeholder="Enter scenario title." type="thin" />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Character</S.InputTitle>
        <ThinDropdown options={['gd', 'dd']} onSelect={() => {}} placeholder="Describe the scenario." />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Description</S.InputTitle>
        <Input placeholder="Describe the scenario." type="thin" />
      </S.InputContainer>
      <S.SelectToggle>
        <S.Select $active={step === 1} onClick={() => handleStep(1)}>
          write directly
        </S.Select>
        <S.Select $active={step === 2} onClick={() => handleStep(2)}>
          record
        </S.Select>
      </S.SelectToggle>
      {step == 1 ? (
        <div>
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
        </div>
      ) : (
        <div>
          <RecordItem title="Navigate to Sign up" type={ACTION_TYPE.NAVIGATE} />
        </div>
      )}
    </S.Container>
  );
}
