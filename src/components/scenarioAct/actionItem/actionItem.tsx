import Button from '@/components/common/button/button';
import * as S from '@/components/scenarioAct/actionItem/actionItem.style';

import CheckCircle from '@/assets/icons/check_circle.svg?react';
import Click from '@/assets/icons/click.svg?react';
import FailCircle from '@/assets/icons/fail_circle.svg?react';
import Globe from '@/assets/icons/globe.svg?react';

export default function ActionItem() {
  return (
    <S.Container>
      <S.Content>
        <Globe />
        <S.ActionName>action_name</S.ActionName>
        <Button>Navigate</Button>
      </S.Content>
      <CheckCircle />
    </S.Container>
  );
}
