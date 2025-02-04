import { useState } from 'react';

import { ACTION_STATE, ACTION_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useAction from '@/hooks/scenarioAct/useAction';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';
import SelectDropdown from '@/components/scenarioAct/selectDropdown/selectDropdown';

import ArrowRight from '@/assets/icons/arrow_right_red.svg?react';
import CheckCircle from '@/assets/icons/check_circle.svg?react';
import Click from '@/assets/icons/click.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';
import UnderError from '@/assets/icons/under_error.svg?react';
import UnderSuccess from '@/assets/icons/under_success.svg?react';
import { openModal } from '@/slices/modalSlice';

interface IActionItem {
  scenarioId: number;
  actionId: number;
}

// 상태 아이콘 매핑
const stateIconMap = {
  [ACTION_STATE.SUCCESS]: CheckCircle,
  [ACTION_STATE.ERROR]: FailCircle,
  [ACTION_STATE.UNVERIFIED]: null,
};

// 액션 아이콘 매핑
const actionIconMap = {
  [ACTION_TYPE.NAVIGATE]: Globe,
  [ACTION_TYPE.CLICK]: Click,
  [ACTION_TYPE.HOVER]: null,
  [ACTION_TYPE.FILL_TEXT]: null,
  [ACTION_TYPE.WAITING]: null,
};

const locatorList = ['id', 'name', 'class_name', 'tag_name', 'link_text', 'partial_link_text', 'css_selector', 'xpath'];
const actionList = ['click', 'send_keys', 'clear', 'get_attribute', 'text', 'is_displayed', 'is_enabled', 'is_selected', 'get_screenshot_as_file'];

export default function ActionItem({ scenarioId, actionId }: IActionItem) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const actionState = ACTION_STATE.SUCCESS;

  // 액션 가져오기
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId),
  );
  // refetch할때 필요
  const characterId = useSelector((state) => state.scenarioAct.characterId);

  // 상태 관리
  const [locatorStrategy, setLocatorStrategy] = useState(action?.locator.strategy || '');
  const [actionType, setActionType] = useState(action?.action.type || '');
  const [locatorInputValue, setLocatorInputValue] = useState(action?.locator.value || '');
  const [actionInputValue, setActionInputValue] = useState(action?.action.value || '');

  const { useEditAction } = useAction(characterId);
  //const { mutate: editMutate, isPending } = useEditAction;

  // 변경 감지하여 Apply 버튼 활성화
  const isLocatorApplyDisabled = locatorStrategy === action?.locator.strategy && locatorInputValue === action?.locator.value;
  const isActionApplyDisabled = actionType === action?.action.type && actionInputValue === action?.action.value;

  // Locator 적용
  const onSubmitLocator = () => {
    /*     editMutate({
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
    }); */
  };

  // Action 적용
  const onSubmitAction = () => {
    /*     editMutate({
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
    }); */
  };

  // 모달 함수
  const handleModal = (): void => {
    dispatch(openModal('scenarioActModal'));
  };

  // 액션 오픈 함수
  const handleIsOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  // 마지막 액션인지 확인
  const lastActionId = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.lastActionId);
  const isLastAction = lastActionId === actionId;

  return (
    <S.Container $isError={false}>
      {/* 헤더 */}
      <S.Header state={actionState || ACTION_STATE.UNVERIFIED} $isLastAction={isLastAction} $isOpen={isOpen} onClick={handleIsOpen}>
        <S.Content>
          {action?.actionType && <S.IconContainer>{getIcon(actionIconMap, action.actionType)}</S.IconContainer>}
          <S.ActionName>{action?.actionDescription || '액션'}</S.ActionName>
          <S.ActionType>{action?.actionType}</S.ActionType>
        </S.Content>
        {actionState && <S.IconContainer>{getIcon(stateIconMap, actionState)}</S.IconContainer>}
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
              <S.Input value={locatorInputValue} onChange={(e) => setLocatorInputValue(e.target.value)} />
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
              {/* 특정 Action Type일 때만 Input 표시 */}
              {['send_keys', 'get_attribute'].includes(actionType) && (
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
        (actionState === ACTION_STATE.SUCCESS ? (
          <S.UnderIcon>
            <UnderSuccess />
          </S.UnderIcon>
        ) : actionState === ACTION_STATE.ERROR ? (
          <div>
            <S.UnderIcon>
              <UnderError />
            </S.UnderIcon>
            <S.CheckError onClick={handleModal}>
              Check the error
              <ArrowRight />
            </S.CheckError>
          </div>
        ) : null)}
    </S.Container>
  );
}
