import * as S from '@/components/scenario/ScenarioItem/ScenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';

interface IScenarioItemProps {
  name: string;
  createdBy: string;
  createdAt: string;
  isChecked: boolean;
}

export default function ScenarioItem({ name, createdBy, createdAt, isChecked }: IScenarioItemProps) {
  return (
    <S.ScenarioItem>
      <S.ScenarioItemLeftSide>
        <File />
        <p>{name}</p>
      </S.ScenarioItemLeftSide>
      <S.ScenarioRightSide>
        <S.Creater>
          <Calender width={24} height={24} />
          <p>{createdBy}</p>
        </S.Creater>
        <S.Elapsed>
          <UserCircle />
          <p>{createdAt}</p>
        </S.Elapsed>
      </S.ScenarioRightSide>
    </S.ScenarioItem>
  );
}
