import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ACTION_TYPE } from '@/enums/enums';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/addInputForm/addInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import Pause from '@/assets/icons/pause.svg?react';
import RecordDone from '@/assets/icons/record_done.svg?react';

export default function AddInputForm() {
  // 스텝 - write directly: 1, record: 2
  const [step, setStep] = useState(1);
  const [isRecord, setIsRecord] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  // 스텝 함수
  const handleStep = (selectedStep: number) => {
    setStep(selectedStep);
  };
  //
  const handleAddAction = () => {
    if (!isValid) {
      console.error('빈칸');
      return;
    }
    console.log('추가');
  };

  // 녹음 상태
  const handleIsRecord = () => {
    setIsRecord(!isRecord);
  };

  // 제출 함수
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* input들 */}
        <S.InputContainer>
          <S.InputTitle>Title</S.InputTitle>
          <Input placeholder="Enter scenario title." type="thin" {...register('title', { required: true })} />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputTitle>Character</S.InputTitle>
          <Controller
            name="character"
            control={control}
            rules={{ required: 'Character is required.' }}
            render={({ field }) => <ThinDropdown options={['gd', 'dd']} value={field.value} onChange={field.onChange} placeholder="Select character." />}
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputTitle>Description</S.InputTitle>
          <Input placeholder="Describe the scenario." type="thin" {...register('description', { required: true })} />
        </S.InputContainer>
        {/* Select Toggle */}
        <S.SelectToggle>
          <S.Select $active={step === 1} onClick={() => handleStep(1)}>
            write directly
          </S.Select>
          <S.Select $active={step === 2} onClick={() => handleStep(2)}>
            record
          </S.Select>
        </S.SelectToggle>

        {/* write directly */}
        {step === 1 ? (
          <div>
            <S.DetailContainer>
              <RecordItem />
              <Input placeholder="Enter action title." type="thin" {...register('actionTitle', { required: true })} />
              <Controller
                name="action"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <ThinDropdown options={['gd', 'dd']} value={field.value} onChange={field.onChange} placeholder="Select action." />}
              />
              <S.DivideInputContainer>
                <Controller
                  name="keyAction"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <ThinDropdown options={['gd', 'dd']} value={field.value} onChange={field.onChange} placeholder="Select key action." />}
                />
                <Input placeholder="Enter key." type="thin" {...register('key', { required: true })} />
              </S.DivideInputContainer>
              <S.AddButton onClick={handleAddAction} disabled={!isValid}>
                {isValid ? <Add /> : <AddDark />}
              </S.AddButton>
            </S.DetailContainer>

            <S.ButtonContainer>
              <Button type="normal" color="default" disabled={!isValid}>
                Save
              </Button>
            </S.ButtonContainer>
          </div>
        ) : (
          <div>
            {/* record */}
            <RecordItem title="Navigate to Sign up" type={ACTION_TYPE.NAVIGATE} />
            {isRecord ? (
              <S.ButtonContainer>
                <p>Recording ...</p>
                <S.ButtonWrapper>
                  <Pause />
                </S.ButtonWrapper>
                <S.ButtonWrapper onClick={handleIsRecord}>
                  <RecordDone />
                </S.ButtonWrapper>
              </S.ButtonContainer>
            ) : (
              <S.ButtonContainer>
                <Button type="normal" color="default" onClick={handleIsRecord}>
                  Record
                </Button>
              </S.ButtonContainer>
            )}
          </div>
        )}
      </form>
    </S.Container>
  );
}
