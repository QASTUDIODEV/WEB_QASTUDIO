import type { TScenarioList } from '@/types/scenario/scenario';

import { formatRelativeTime } from '@/utils/transformDate';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import CheckBox from '@/components/scenario/checkBox/checkBox';
import * as S from '@/components/scenario/scenarioItem/scenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';

interface IScenarioItemProps {
  characterId: number;
  scenarioData: TScenarioList;
}

export default function ScenarioItem({ characterId, scenarioData }: IScenarioItemProps) {
  const scenarioId = scenarioData.scenarioId;
  //시나리오 가져오기
  const character = useSelector((state) => state.scenario.characters.find((char) => char.id === characterId));
  const scenario = character?.scenarios.scenarioList.find((char) => char.scenarioId === scenarioId);

  //편집 상태 판단
  const isEdit: boolean = useSelector((state) => state.scenario.isEdit);

  if (!scenario) {
    return null; // scenario가 없다면 렌더링하지 않음
  }

  return (
    <>
      {isEdit ? (
        <S.ScenarioItem $isChecked={scenario.isChecked} $isEdit={isEdit}>
          <S.ScenarioItemLeftSide>
            <S.IconContainer>
              <CheckBox scenarioId={scenarioId} characterId={characterId} />
            </S.IconContainer>
            <S.IconContainer>
              <File />
            </S.IconContainer>
            <S.ScenarioTitle>{scenarioData.scenarioName}</S.ScenarioTitle>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <UserCircle />
              <p>{scenarioData.author}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{formatRelativeTime(scenarioData.createdAt)}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      ) : (
        <S.ScenarioItem $isChecked={scenario.isChecked} $isSelected={scenario.isSelected}>
          <S.ScenarioItemLeftSide>
            <S.IconContainer>
              <File />
            </S.IconContainer>
            <S.ScenarioTitle>{scenarioData.scenarioName}</S.ScenarioTitle>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <UserCircle />
              <p>{scenarioData.author}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{formatRelativeTime(scenarioData.createdAt)}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      )}
    </>
  );
}
