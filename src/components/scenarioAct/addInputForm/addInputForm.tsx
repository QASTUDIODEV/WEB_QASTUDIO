import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useScenario from '@/hooks/scenarioAct/useScenario';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/addInputForm/addInputForm.style';
import RecordItem from '@/components/scenarioAct/recordItem/recordItem';
import ThinDropdown from '@/components/scenarioAct/thinDropdown/thinDropdown';

import Add from '@/assets/icons/add.svg?react';
import AddDark from '@/assets/icons/add_dark.svg?react';
import { addAction, blurLocatorInput, clickLocatorInput, focusLocatorInput } from '@/slices/scenarioActSlice';

const locatorList = ['id', 'css_selector', 'xpath'];
const actionList = ['click', 'send_keys'];

export default function AddInputForm() {
  const dispatch = useDispatch();
  const recordActions = useSelector((state) => state.scenarioAct.recordActions);
  const characters = useSelector((state) => state.scenarioAct.characters);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const { useCreateScenario } = useScenario();
  const { mutate: createMutate } = useCreateScenario; //isPendding
  const [step, setStep] = useState(1);

  // ✅ Redux에서 로케이터 정보 가져오기
  const currentLocator = useSelector((state) => state.scenarioAct.currentLocator);
  const isClicked = currentLocator.isClicked;

  // ✅ locatorState를 관리하는 useState
  const [locatorStrategy, setLocatorStrategy] = useState('');
  const [locatorInputValue, setLocatorInputValue] = useState('');

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

  // ✅ Redux 상태와 react-hook-form 값을 동기화
  useEffect(() => {
    if (isClicked && currentLocator.actionId === 'WRITE_DIRECTLY') {
      const newValue =
        locatorStrategy === 'id' ? currentLocator.id || '' : locatorStrategy === 'css_selector' ? currentLocator.cssSelector || '' : currentLocator.xPath || '';

      setLocatorInputValue(newValue);
      setValue('locatorValue', newValue); // react-hook-form과 동기화
      dispatch(clickLocatorInput(false));
    }
  }, [isClicked, currentLocator, locatorStrategy, dispatch, setValue]);

  // 인풋 포커스 핸들러
  const handleFocus = () => {
    dispatch(focusLocatorInput('WRITE_DIRECTLY'));
  };

  const handleBlur = () => {
    setTimeout(() => {
      dispatch(blurLocatorInput());
    }, 500);
  };

  // 시나리오 생성
  const onSubmitScenario = (data: any) => {
    createMutate({
      characterId: characterId || 0,
      pageId: 18, //페이지 아이디 수정
      scenarioName: data.scenarioName,
      scenarioDescription: data.scenarioDescription,
      actions: recordActions,
    });
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

  // 액션 타입 감지
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
              placeholder="Select character."
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
        <S.DetailContainer>
          {recordActions.map((action) => (
            <RecordItem key={action.step} step={action.step} />
          ))}
          <Input placeholder="Enter action title." type="thin" {...registerAction('actionTitle', { required: true })} />

          {/* 로케이터 선택 */}
          <S.DivideInputContainer>
            <Controller
              name="strategy"
              control={actionControl}
              rules={{ required: true }}
              render={({ field }) => (
                <ThinDropdown
                  options={locatorList}
                  value={locatorStrategy}
                  onChange={(value) => {
                    setLocatorStrategy(value);
                    field.onChange(value);
                  }}
                  placeholder="Select locator."
                />
              )}
            />
            <Input
              placeholder="Enter key."
              type="thin"
              value={locatorInputValue}
              onChange={(e) => {
                setLocatorInputValue(e.target.value);
                setValue('locatorValue', e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </S.DivideInputContainer>

          {/* 액션 선택 */}
          <S.DivideInputContainer>
            <Controller
              name="actionType"
              control={actionControl}
              rules={{ required: true }}
              render={({ field }) => <ThinDropdown options={actionList} value={field.value} onChange={field.onChange} placeholder="Select key action." />}
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
      ) : null}
    </S.Container>
  );
}
