import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { ACTION_TYPE, LOCATOR_TYPE } from '@/enums/enums';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenario from '@/hooks/scenarioAct/useScenario';

import Button from '@/components/common/button/button';
import Input from '@/components/scenarioAct/input/input';
import * as S from '@/components/scenarioAct/modifyInputForm/modifyInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import { addAction, blurLocatorInput, clickLocatorInput, focusLocatorInput } from '@/slices/scenarioActSlice';

const locatorList = Object.values(LOCATOR_TYPE);
const actionList = Object.values(ACTION_TYPE);

export default function AddInputForm() {
  const dispatch = useDispatch();
  const recordActions = useSelector((state) => state.scenarioAct.recordActions);
  const characters = useSelector((state) => state.scenarioAct.characters);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const { useCreateScenario } = useScenario();
  const { mutate: createMutate } = useCreateScenario; //isPendding
  const [step, setStep] = useState(1);

  // 자동입력(locator)
  const currentLocator = useSelector((state) => state.scenarioAct.currentLocator);
  const isClicked = currentLocator.isClicked;

  // 인풋 포커스
  const handleFocus = () => {
    dispatch(focusLocatorInput('WRITE_DIRECTLY'));
  };
  const handleBlur = () => {
    setTimeout(() => {
      dispatch(blurLocatorInput());
    }, 500);
  };

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
    setValue,
    formState: { isValid: isActionValid },
    reset: resetActionForm,
  } = useForm({ mode: 'onChange' });

  const locatorStrategy = useWatch({ control: actionControl, name: 'strategy' });
  const locatorInputValue = useWatch({ control: actionControl, name: 'locatorValue' });

  // 현재 클릭된 요소를 locator 값으로 설정
  useEffect(() => {
    if (isClicked && currentLocator.actionId === 'WRITE_DIRECTLY') {
      const newValue =
        locatorStrategy === 'id' ? currentLocator.id || '' : locatorStrategy === 'css_selector' ? currentLocator.cssSelector || '' : currentLocator.xPath || '';

      setValue('locatorValue', newValue);
      dispatch(clickLocatorInput(false));
    }
  }, [isClicked, currentLocator, locatorStrategy, dispatch, setValue]);

  // 시나리오 생성
  const onSubmitScenario = (data: any) => {
    console.log('시나생성');
    createMutate({
      characterId: characterId || 0,
      pageId: 18, //페이지 아이디 수정
      scenarioName: data.scenarioName,
      scenarioDescription: data.scenarioDescription,
      actions: recordActions,
    });
    console.log('시나생성');
  };

  // 액션record 생성
  const onSubmitAction = (data: any) => {
    const newAction = {
      actionDescription: data.actionTitle,
      step: recordActions.length + 1,
      actionType: data.actionType,
      locator: { strategy: data.strategy, value: data.locatorValue },
      action: { type: data.actionType, value: data.actionValue || '' },
    };
    dispatch(addAction(newAction));
    resetActionForm({
      actionTitle: '',
      locatorValue: '',
      actionValue: '',
    });
  };
  const actionType = useWatch({ control: actionControl, name: 'actionType' });
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
              placeholder="Select a role for the scenario."
            />
          )}
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Description</S.InputTitle>
        <Input placeholder="Describe the scenario." type="thin" {...registerScenario('scenarioDescription', { required: true })} />
      </S.InputContainer>

      {/* 선택 토글 */}
      <S.SelectHeader>Actions</S.SelectHeader>

      {step === 1 ? (
        <>
          <S.DetailContainer>
            {recordActions.map((action) => (
              <RecordItem key={action.step} step={action.step} />
            ))}
            <Input placeholder="Enter action title." type="thin" {...registerAction('actionTitle', { required: true })} />
            {/* 액션 타입 */}
            <S.DivideInputContainer>
              <Controller
                name="actionType"
                control={actionControl}
                rules={{ required: true }}
                render={({ field }) => <ThinDropdown options={actionList} value={field.value} onChange={field.onChange} placeholder="Select action." />}
              />
              {['send_keys', 'get_attribute'].includes(actionType) && (
                <Input placeholder="Enter key." type="thin" {...registerAction('actionValue', { required: true })} />
              )}
            </S.DivideInputContainer>
            {/* 로케이터 */}
            <S.DivideInputContainer>
              <Controller
                name="strategy"
                control={actionControl}
                rules={{ required: true }}
                render={({ field }) => <ThinDropdown options={locatorList} value={field.value} onChange={field.onChange} placeholder="Select locator." />}
              />
              <Input
                placeholder="Enter key."
                type="thin"
                value={locatorInputValue}
                onChange={(e) => setValue('locatorValue', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </S.DivideInputContainer>

            <S.AddButton as="button" type="button" disabled={!isActionValid} onClick={handleActionSubmit(onSubmitAction)}>
              {isActionValid ? <Add /> : <AddDark />}
            </S.AddButton>
            <S.ButtonContainer>
              <Button type="normal" color="default" disabled={!isScenarioValid} onClick={handleScenarioSubmit(onSubmitScenario)}>
                Save
              </Button>
            </S.ButtonContainer>
          </S.DetailContainer>
        </>
      ) : (
        <div>
          {/* <RecordItem  /> */}
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
