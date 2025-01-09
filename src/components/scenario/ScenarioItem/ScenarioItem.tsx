import { useSelector } from 'react-redux';

import CheckBox from '@/components/scenario/CheckBox/CheckBox';
import * as S from '@/components/scenario/ScenarioItem/ScenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import type { TRootState } from '@/store/store';

interface IScenarioItemProps {
  scenarioId: number;
  characterId: number;
  name: string;
  createdBy: string;
  createdAt: string;
}

export default function ScenarioItem({ scenarioId, characterId, name, createdBy, createdAt }: IScenarioItemProps) {
  const isEdit = useSelector((state: TRootState) => state.scenario.isEdit);

  return (
    <>
      {isEdit ? (
        <S.ScenarioItem>
          <S.ScenarioItemLeftSide>
            <CheckBox scenarioId={scenarioId} characterId={characterId} />
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
      ) : (
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
      )}
    </>
  );
}
