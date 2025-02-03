import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ACTION_TYPE } from '@/enums/enums';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenario from '@/hooks/scenarioAct/useScenario';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/addInputForm/addInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import { addAction } from '@/slices/scenarioActSlice';

export default function AddInputForm() {
  const dispatch = useDispatch();
  const recordActions = useSelector((state) => state.scenarioAct.recordActions);
  const characters = useSelector((state) => state.scenarioAct.characters);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const { useCreateScenario } = useScenario();
  const { mutate: createMutate } = useCreateScenario; //isPendding
  const [step, setStep] = useState(1);

  const {
    register: registerScenario,
    handleSubmit: handleScenarioSubmit,
    control: scenarioControl,
    formState: { isValid: isScenarioValid },
  } = useForm({ mode: 'onChange' });

  const {
    register: registerAction,
    handleSubmit: handleActionSubmit,
    control: actionControl,
    formState: { isValid: isActionValid },
    reset: resetActionForm,
  } = useForm({ mode: 'onChange' });

  // 시나리오 생성
  const onSubmitScenario = (data: any) => {
    console.log('Scenario Submitted:', data);
    createMutate({
      characterId: characterId || 0,
      pageId: data,
      scenarioName: data.scenarioName,
      scenarioDescription: data.scenarioDescription,
      actions: recordActions,
    });
  };

  // 액션 생성
  const onSubmitAction = (data: any) => {
    const newAction = {
      actionDescription: data.actionTitle,
      step: recordActions.length + 1,
      actionType: data.action,
      locator: { strategy: data.strategy, value: data.key },
      action: { type: data.type, value: data.key },
    };

    dispatch(addAction(newAction));
    resetActionForm();
  };

  return (
    <S.Container>
      {/* 시나리오 입력 폼 */}
      <S.InputContainer>
        <S.InputTitle>Title</S.InputTitle>
        <Input placeholder="Enter scenario title." type="thin" {...registerScenario('scenarioName', { required: true })} />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Character</S.InputTitle>
        <Controller
          name="character"
          control={scenarioControl}
          rules={{ required: true }}
          render={({ field }) => (
            <ThinDropdown
              options={characters.map((char) => char.characterName)}
              value={characters.find((char) => char.characterId === field.value)?.characterName || ''}
              onChange={(selected) => field.onChange(characters.find((char) => char.characterName === selected)?.characterId)}
              placeholder="Select character."
            />
          )}
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Description</S.InputTitle>
        <Input placeholder="Describe the scenario." type="thin" {...registerScenario('scenarioDescription', { required: true })} />
      </S.InputContainer>

      <S.ButtonContainer>
        <Button type="normal" color="default" disabled={!isScenarioValid} onClick={handleScenarioSubmit(onSubmitScenario)}>
          Save Scenario
        </Button>
      </S.ButtonContainer>

      {/* 선택 토글 */}
      <S.SelectToggle>
        <S.Select $active={step === 1} onClick={() => setStep(1)}>
          write directly
        </S.Select>
        <S.Select $active={step === 2} onClick={() => setStep(2)}>
          record
        </S.Select>
      </S.SelectToggle>

      {step === 1 ? (
        <>
          <S.DetailContainer>
            {recordActions.map((action) => (
              <RecordItem key={action.step} title={action.actionDescription} />
            ))}

            <Input placeholder="Enter action title." type="thin" {...registerAction('actionTitle', { required: true })} />
            <Controller
              name="strategy"
              control={actionControl}
              rules={{ required: true }}
              render={({ field }) => (
                <ThinDropdown options={['click', 'send_keys']} value={field.value} onChange={field.onChange} placeholder="Select action." />
              )}
            />
            <S.DivideInputContainer>
              <Controller
                name="type"
                control={actionControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <ThinDropdown options={['get_attribute', 'set_value']} value={field.value} onChange={field.onChange} placeholder="Select key action." />
                )}
              />
              <Input placeholder="Enter key." type="thin" {...registerAction('key', { required: true })} />
            </S.DivideInputContainer>

            <S.AddButton as="button" type="button" disabled={!isActionValid} onClick={handleActionSubmit(onSubmitAction)}>
              {isActionValid ? <Add /> : <AddDark />}
            </S.AddButton>
          </S.DetailContainer>
        </>
      ) : (
        <div>
          <RecordItem title="Navigate to Sign up" type={ACTION_TYPE.NAVIGATE} />
          <S.ButtonContainer>
            <Button type="normal" color="default">
              Record
            </Button>
          </S.ButtonContainer>
        </div>
      )}
    </S.Container>
  );
}
