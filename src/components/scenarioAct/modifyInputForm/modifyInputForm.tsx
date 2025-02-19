import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { ACTION_TYPE, LOCATOR_TYPE } from '@/enums/enums';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import Input from '@/components/scenarioAct/input/input';
import * as S from '@/components/scenarioAct/modifyInputForm/modifyInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import { openModal } from '@/slices/modalSlice';
import { addEditAction, blurLocatorInput, clickLocatorInput, fetchEditAction, focusLocatorInput, removeEditAction } from '@/slices/scenarioActSlice';

const locatorList = Object.values(LOCATOR_TYPE);
const actionList = Object.values(ACTION_TYPE);

export default function ModifyInputForm() {
  const dispatch = useDispatch();
  const editRecordActions = useSelector((state) => state.scenarioAct.editRecordActions);
  const selectedScenarioId = useSelector((state) => state.scenarioAct.step.selectedScenarioId);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const characters = useSelector((state) => state.scenarioAct.characters);
  const scenario = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId == selectedScenarioId));
  const actions = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId == selectedScenarioId)?.actions);
  const { usePatchScenarioInfo } = useScenarioList(characterId);
  const { mutate: patchScenarioInfo } = usePatchScenarioInfo;

  const {
    register: registerScenario,
    handleSubmit: handleScenarioSubmit,
    control: scenarioControl,
    setValue: setScenarioValue,
    formState: { isValid: isScenarioValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      scenarioName: scenario?.scenarioName,
      scenarioDescription: scenario?.scenarioDescription,
      character: characterId,
    },
  });

  const {
    register: registerAction,
    handleSubmit: handleActionSubmit,
    control: actionControl,
    setValue: setActionValue,
    formState: { isValid: isActionValid },
    reset: resetActionForm,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (actions) {
      dispatch(fetchEditAction(actions));
    }
  }, [actions, dispatch]);

  useEffect(() => {
    if (scenario) {
      setScenarioValue('scenarioName', scenario.scenarioName);
      setScenarioValue('scenarioDescription', scenario.scenarioDescription);
      setScenarioValue('character', characterId);
    }
  }, [scenario, setScenarioValue]);

  // 자동입력(locator)
  const currentLocator = useSelector((state) => state.scenarioAct.currentLocator);
  const isClicked = currentLocator.isClicked;
  const locatorInputValue = useWatch({ control: actionControl, name: 'locatorValue' });
  const locatorStrategy = useWatch({ control: actionControl, name: 'strategy' });
  const actionType = useWatch({ control: actionControl, name: 'actionType' });

  // 현재 클릭된 요소를 locator 값으로 설정
  useEffect(() => {
    if (isClicked && currentLocator.actionId === 'WRITE_DIRECTLY') {
      const newValue =
        locatorStrategy === 'id' ? currentLocator.id || '' : locatorStrategy === 'css_selector' ? currentLocator.cssSelector || '' : currentLocator.xPath || '';

      setActionValue('locatorValue', newValue);
      dispatch(clickLocatorInput(false));
    }
  }, [isClicked, currentLocator, locatorStrategy, dispatch, setActionValue]);

  // 인풋 포커스
  const handleFocus = () => {
    dispatch(focusLocatorInput('WRITE_DIRECTLY'));
  };
  const handleBlur = () => {
    setTimeout(() => {
      dispatch(blurLocatorInput());
    }, 500);
  };

  // 시나리오 편집
  const onSubmitScenario = (data: any) => {
    patchScenarioInfo({
      scenarioId: selectedScenarioId,
      data: {
        characterId: data.character,
        scenarioName: data.scenarioName,
        scenarioDescription: data.scenarioDescription,
        actions: editRecordActions,
      },
    });
    dispatch(
      openModal({
        modalType: MODAL_TYPES.ContinueModal,
        modalProps: { title: 'The creation has been completed.', description: 'The creation has been completed.' },
      }),
    );
  };

  // 액션record 생성
  const onSubmitAction = (data: any) => {
    const newAction = {
      actionDescription: data.actionTitle,
      step: editRecordActions.length + 1,
      actionType: data.actionType,
      locator: { strategy: data.strategy, value: data.locatorValue },
      action: { type: data.actionType, value: data.actionValue || '' },
    };
    dispatch(addEditAction(newAction));
    resetActionForm({
      actionTitle: '',
      locatorValue: '',
      actionValue: '',
    });
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
      <S.SelectHeader>Actions</S.SelectHeader>

      <S.DetailContainer>
        {editRecordActions.map((action) => (
          <RecordItem
            key={action.step}
            step={action.step}
            actionType={action.actionType}
            actionDescription={action.actionDescription}
            handleDel={() => dispatch(removeEditAction(action.step))}
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
            onChange={(e) => setActionValue('locatorValue', e.target.value)}
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
    </S.Container>
  );
}
