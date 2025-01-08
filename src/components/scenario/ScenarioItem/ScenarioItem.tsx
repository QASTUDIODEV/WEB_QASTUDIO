import * as S from '@/components/scenario/ScenarioItem/ScenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';

export default function ScenarioItem() {
  return (
    <S.ScenarioItem>
      <S.ScenarioItemLeftSide>
        <File />
        <p>시나리오</p>
      </S.ScenarioItemLeftSide>
      <S.ScenarioRightSide>
        <S.Creater>
          <Calender width={24} height={24} />
          <p>작성자 1</p>
        </S.Creater>
        <S.Elapsed>
          <UserCircle />
          <p>a few seconds ago</p>
        </S.Elapsed>
      </S.ScenarioRightSide>
    </S.ScenarioItem>
  );
}
