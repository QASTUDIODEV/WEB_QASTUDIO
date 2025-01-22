import { ACTION_STATE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';

import CheckCircle from '@/assets/icons/check_circle.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';

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
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId === scenarioId)?.actions.find((act) => act.actionId === actionId),
  );

  return (
    <S.Container>
      <S.Content>
        <Globe />
        <S.ActionName>{action?.name || '액션'}</S.ActionName>
        <Button>Navigate</Button>
      </S.Content>
      {action?.state && getIcon(iconMap, action.state)}
    </S.Container>
  );
}
