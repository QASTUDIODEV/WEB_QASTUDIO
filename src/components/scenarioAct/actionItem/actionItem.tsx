import { useState } from 'react';

import { ACTION_STATE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';
import SelectDropdown from '@/components/scenarioAct/selectDropdown/selectDropdown';

import ArrowRight from '@/assets/icons/arrow_right_red.svg?react';
import CheckCircle from '@/assets/icons/check_circle.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';
import UnderError from '@/assets/icons/under_error.svg?react';
import UnderSuccess from '@/assets/icons/under_success.svg?react';
import { openModal } from '@/slices/modalSlice';

interface IActionItem {
  scenarioId: number;
  actionId: number;
}

// 아이콘 매핑
const iconMap = {
  [ACTION_STATE.SUCCESS]: CheckCircle,
  [ACTION_STATE.ERROR]: FailCircle,
  [ACTION_STATE.UNVERIFIED]: null,
};

export default function ActionItem({ scenarioId, actionId }: IActionItem) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // 액션
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId),
  );
  const isError = action?.state === ACTION_STATE.ERROR;
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
      <S.Header state={action?.state || ACTION_STATE.UNVERIFIED} $isLastAction={isLastAction} $isOpen={isOpen} onClick={handleIsOpen}>
        <S.Content>
          <Globe />
          <S.ActionName>{action?.name || '액션'}</S.ActionName>
          <S.ActionType>{action?.actionType}</S.ActionType>
        </S.Content>
        {action?.state && getIcon(iconMap, action.state)}
      </S.Header>
      {isOpen && (
        <S.DescriptionContainer>
          <S.DescriptionItem>
            <S.DescriptionRow>
              locator
              <S.DropdownContainer>
                <SelectDropdown options={['css_selector', 'id']} onSelect={() => {}} />
              </S.DropdownContainer>
            </S.DescriptionRow>

            <S.DescriptionRow>
              <S.Input />
              <Button color="blue">Apply</Button>
            </S.DescriptionRow>
          </S.DescriptionItem>
        </S.DescriptionContainer>
      )}

      {isLastAction &&
        (action?.state === ACTION_STATE.SUCCESS ? (
          <S.UnderIcon>
            <UnderSuccess />
          </S.UnderIcon>
        ) : action?.state === ACTION_STATE.ERROR ? (
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
