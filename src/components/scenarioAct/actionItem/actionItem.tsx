import { useEffect, useState } from 'react';

import { ACTION_STATE, ACTION_TYPE, LOCATOR_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useAction from '@/hooks/scenarioAct/useAction';

import Button from '@/components/common/button/button';
import LoadingSpinner from '@/components/common/loading/loadingSpinner';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';
import SelectDropdown from '@/components/scenarioAct/selectDropdown/selectDropdown';

import ArrowRight from '@/assets/icons/arrow_right_red.svg?react';
import CheckCircle from '@/assets/icons/check_circle.svg?react';
import Click from '@/assets/icons/click.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';
import Input from '@/assets/icons/input.svg?react';
import UnderError from '@/assets/icons/under_error.svg?react';
import UnderSuccess from '@/assets/icons/under_success.svg?react';
import { openModal } from '@/slices/modalSlice';
import { blurLocatorInput, clickLocatorInput, focusLocatorInput } from '@/slices/scenarioActSlice';

interface IActionItem {
  scenarioId: number;
  actionId: number;
}

// 상태 아이콘 매핑
const stateIconMap = {
  [ACTION_STATE.SUCCESS]: CheckCircle,
  [ACTION_STATE.FAIL]: FailCircle,
  [ACTION_STATE.IN_PROGRESS]: LoadingSpinner,
  [ACTION_STATE.UNVERIFIED]: null,
};

// 액션 아이콘 매핑
const actionIconMap = {
  [ACTION_TYPE.CLICK]: Click,
  [ACTION_TYPE.NAVIGATE]: Globe,
  [ACTION_TYPE.Fill_Text]: Input,
};

const locatorList = Object.values(LOCATOR_TYPE);
const actionList = Object.values(ACTION_TYPE);

export default function ActionItem({ scenarioId, actionId }: IActionItem) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // 액션
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId),
  );
  // 액션 상태
  const actionState =
    useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId)?.state) ||
    null;

  // iframe element 선택
  const currentLocator = useSelector((state) => state.scenarioAct.currentLocator);
  const characterId = useSelector((state) => state.scenarioAct.characterId);
  const isClicked = currentLocator.isClicked;

  //testId
  const currentTestId = useSelector((state) => state.scenarioAct.currentTestId);
  // 상태 관리
  const [locatorStrategy, setLocatorStrategy] = useState(action?.locator.strategy || '');
  const [actionType, setActionType] = useState(action?.action.type || '');
  const [locatorInputValue, setLocatorInputValue] = useState(action?.locator.value || '');
  const [actionInputValue, setActionInputValue] = useState(action?.action.value || '');

  const { useEditAction } = useAction(characterId);
  const { mutate: editMutate } = useEditAction;

  //Apply 버튼 활성화
  const isLocatorApplyDisabled = locatorStrategy === action?.locator.strategy && locatorInputValue === action?.locator.value;
  const isActionApplyDisabled = actionType === action?.action.type && actionInputValue === action?.action.value;

  useEffect(() => {
    if (isClicked && currentLocator.actionId === actionId) {
      setLocatorInputValue(
        locatorStrategy === 'id' ? currentLocator.id || '' : locatorStrategy === 'css_selector' ? currentLocator.cssSelector || '' : currentLocator.xPath || '',
      );
      dispatch(clickLocatorInput(false));
    }
  }, [currentLocator, locatorStrategy, isClicked]);

  // 가장 최근 액션인지
  const lastActionId = useSelector((state) => state.scenarioAct.webSocket.lastActionId);
  const isLastAction = lastActionId === actionId;

  // Locator 수정
  const onSubmitLocator = () => {
    editMutate({
      actionId: action?.actionId,
      data: {
        actionDescription: action?.actionDescription ?? '',
        step: action?.step ?? 0,
        actionType: action?.actionType ?? '',
        locator: {
          strategy: locatorStrategy,
          value: locatorInputValue,
        },
        action: action?.action ?? { type: '', value: '' },
      },
    });
  };

  // Action 수정
  const onSubmitAction = () => {
    editMutate({
      actionId: action?.actionId,
      data: {
        actionDescription: action?.actionDescription ?? '',
        step: action?.step ?? 0,
        actionType: action?.actionType ?? '',
        locator: {
          strategy: locatorStrategy,
          value: locatorInputValue,
        },
        action: {
          type: actionType,
          value: actionInputValue,
        },
      },
    });
  };

  // 모달 함수
  const handleModal = (testId: number) => {
    dispatch(openModal({ modalType: MODAL_TYPES.ScenarioActErrorModal, modalProps: { testId: testId } }));
  };

  // 액션 오픈 함수
  const handleIsOpen = (): void => {
    setIsOpen((prev) => !prev);
  };
  // 인풋 포커스
  const handleFocus = () => {
    dispatch(focusLocatorInput(actionId));
  };
  // 인풋 포커스 해제
  const handleBlur = () => {
    setTimeout(() => {
      dispatch(blurLocatorInput());
    }, 500);
  };

  return (
    <S.Container $isError={actionState == ACTION_STATE.FAIL}>
      {/* 헤더 */}
      <S.Header state={actionState || ACTION_STATE.UNVERIFIED} $isLastAction={isLastAction} $isOpen={isOpen} onClick={handleIsOpen}>
        <S.Content>
          {action?.actionType && <S.IconContainer>{getIcon(actionIconMap, action.actionType)}</S.IconContainer>}
          <S.ActionName>{action?.actionDescription}</S.ActionName>
          <S.ActionType>{action?.actionType}</S.ActionType>
        </S.Content>
        <S.IconContainer>{actionState !== null ? getIcon(stateIconMap, actionState) : null}</S.IconContainer>
      </S.Header>

      {/* 세부 사항 */}
      {isOpen && (
        <S.DescriptionContainer>
          {/* Locator */}
          <S.DescriptionItem>
            <S.DescriptionRow>
              Locator
              <S.DropdownContainer>
                <SelectDropdown options={locatorList} initialValue={locatorStrategy} onSelect={setLocatorStrategy} type="thin" />
              </S.DropdownContainer>
            </S.DescriptionRow>
            <S.DescriptionRow>
              <S.Input value={locatorInputValue} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setLocatorInputValue(e.target.value)} />

              <Button color="blue" onClick={onSubmitLocator} disabled={isLocatorApplyDisabled}>
                Apply
              </Button>
            </S.DescriptionRow>
          </S.DescriptionItem>

          {/* Action */}
          <S.DescriptionItem>
            <S.DescriptionRow>
              Action
              <S.DropdownContainer>
                <SelectDropdown options={actionList} initialValue={actionType} onSelect={setActionType} type="thin" />
              </S.DropdownContainer>
            </S.DescriptionRow>
            <S.DescriptionRow>
              {/* send_keys일 때만 Input 표시 */}
              {['Fill_Text'].includes(actionType) && (
                <S.DescriptionRow>
                  <S.Input value={actionInputValue} onChange={(e) => setActionInputValue(e.target.value)} />
                </S.DescriptionRow>
              )}
              <Button color="blue" onClick={onSubmitAction} disabled={isActionApplyDisabled}>
                Apply
              </Button>
            </S.DescriptionRow>
          </S.DescriptionItem>
        </S.DescriptionContainer>
      )}

      {/* 언더라인 */}
      {isLastAction &&
        (actionState == ACTION_STATE.SUCCESS ? (
          <S.UnderIcon>
            <UnderSuccess />
          </S.UnderIcon>
        ) : actionState == ACTION_STATE.FAIL ? (
          <div>
            <S.UnderIcon>
              <UnderError />
            </S.UnderIcon>
            <S.CheckError onClick={() => handleModal(currentTestId)}>
              Check the error
              <ArrowRight />
            </S.CheckError>
          </div>
        ) : null)}
    </S.Container>
  );
}
