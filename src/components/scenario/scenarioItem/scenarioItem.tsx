import React from 'react';

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
  isSelected: boolean;
  setSelectedIdx: React.Dispatch<React.SetStateAction<{ isCharacter: boolean; idx: number }>>;
}

export default function ScenarioItem({ characterId, scenarioData, isSelected, setSelectedIdx }: IScenarioItemProps) {
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
    <S.ScenarioItem
      $isChecked={scenario.isChecked}
      $isEdit={isEdit}
      $isSelected={isSelected}
      onClick={() => {
        setSelectedIdx({ isCharacter: false, idx: scenario.scenarioId });
      }}
    >
      <S.ScenarioItemLeftSide>
        {isEdit && (
          <S.IconContainer>
            <CheckBox scenarioId={scenarioId} characterId={characterId} isButtonGroup={false} />
          </S.IconContainer>
        )}

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
  );
}
