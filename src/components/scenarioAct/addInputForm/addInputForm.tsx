import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { ACTION_TYPE, LOCATOR_TYPE } from '@/enums/enums';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenario from '@/hooks/scenarioAct/useScenario';
import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import * as S from '@/components/scenarioAct/addInputForm/addInputForm.style';
import Input from '@/components/scenarioAct/input/input';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import { openModal } from '@/slices/modalSlice';
import { addAction, blurLocatorInput, clickLocatorInput, fetchAction, focusLocatorInput, removeAction } from '@/slices/scenarioActSlice';

const locatorList = Object.values(LOCATOR_TYPE);
const actionList = Object.values(ACTION_TYPE);

export default function AddInputForm() {
  const dispatch = useDispatch();
  const recordActions = useSelector((state) => state.scenarioAct.recordActions);
  const characters = useSelector((state) => state.scenarioAct.characters);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const { useCreateScenario } = useScenarioList(characterId);
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

  useEffect(() => {
    dispatch(fetchAction([]));
    return () => {
      dispatch(fetchAction([]));
    };
  }, [step, dispatch]);

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
    createMutate({
      characterId: data.character,
      pageId: 18, //페이지 아이디 수정
      scenarioName: data.scenarioName,
      scenarioDescription: data.scenarioDescription,
      actions: recordActions,
    });
    dispatch(
      openModal({
        modalType: MODAL_TYPES.ContinueModal,
        modalProps: { title: 'The modification has been completed.', description: 'The modification has been completed.' },
      }),
    );
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
              onChange={(selectedCharacterName) => {
                const selectedCharacter = characters.find((char) => char.characterName === selectedCharacterName);
                field.onChange(selectedCharacter?.characterId);
              }}
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
              <RecordItem
                key={action.step}
                step={action.step}
                actionType={action.actionType}
                actionDescription={action.actionDescription}
                handleDel={() => dispatch(removeAction(action.step))}
              />
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
              {['Fill_Text'].includes(actionType) && <Input placeholder="Enter key." type="thin" {...registerAction('actionValue', { required: true })} />}
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
