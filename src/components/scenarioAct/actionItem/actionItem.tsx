import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';

import CheckCircle from '@/assets/icons/check_circle.svg?react';
import Click from '@/assets/icons/click.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';

interface IActionItem {
  scenarioId: number;
  actionId: number;
}

const iconMap = {
  success: CheckCircle,
  error: FailCircle,
  unverified: null, // 아무것도 표시하지 않음
};

export default function ActionItem({ scenarioId, actionId }: IActionItem) {
  const action = useSelector((state) =>
    state.scenarioAct.scenarios.find((scn) => scn.scenarioId == scenarioId)?.actions.find((act) => act.actionId == actionId),
  );
  return (
    <S.Container>
      <S.Content>
        <Globe />
        <S.ActionName>{action?.name || '액션'}</S.ActionName>
        <Button>Navigate</Button>
        {/* 버튼 바뀜 */}
      </S.Content>
      {/* 아이콘 바뀜 */}
      <CheckCircle />
      {action?.state && getIcon(iconMap, action.state)}
    </S.Container>
  );
}
