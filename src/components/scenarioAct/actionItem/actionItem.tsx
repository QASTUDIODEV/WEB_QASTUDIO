import { useState } from 'react';

import { ACTION_STATE, ACTION_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

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

export default function ActionItem({ scenarioId, actionId }: IActionItem) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const actionState = ACTION_STATE.SUCCESS; // action?.state
  // 액션
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId),
  );
  const isError = true;
  // 마지막 액션 추적
  const lastActionId = useSelector((state) => state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.lastActionId);
  const isLastAction = lastActionId === actionId;

  //모달 함수
  const handleModal = (): void => {
    dispatch(openModal('scenarioActModal'));
  };

  //액션 오픈 함수
  const handleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Container $isError={isError}>
      {/* 헤더 */}
      <S.Header state={actionState || ACTION_STATE.UNVERIFIED} $isLastAction={isLastAction} $isOpen={isOpen} onClick={handleIsOpen}>
        <S.Content>
          {action?.actionType && <S.IconContainer>{getIcon(actionIconMap, action.actionType)}</S.IconContainer>}
          <S.ActionName>{action?.actionDescription || '액션'}</S.ActionName>
          <S.ActionType>{action?.actionType}</S.ActionType>
        </S.Content>
        {actionState && <S.IconContainer>getIcon(stateIconMap, actionState)</S.IconContainer>}
      </S.Header>

      {/* 세부 사항 */}
      {isOpen && (
        <S.DescriptionContainer>
          <S.DescriptionItem>
            <S.DescriptionRow>
              locator
              <S.DropdownContainer>
                <SelectDropdown options={['css_selector', 'id']} onSelect={() => {}} type="thin" />
              </S.DropdownContainer>
            </S.DescriptionRow>

            <S.DescriptionRow>
              <S.Input value={action?.locator.value} />
              <Button color="blue">Apply</Button>
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
