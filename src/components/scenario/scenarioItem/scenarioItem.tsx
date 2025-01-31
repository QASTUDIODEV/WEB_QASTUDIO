import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';

import CheckBox from '@/components/scenario/checkBox/checkBox';
import * as S from '@/components/scenario/scenarioItem/scenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import { selectEntity } from '@/slices/scenarioSlice';

interface IScenarioItemProps {
  scenarioId: number;
  characterId: number;
}

export default function ScenarioItem({ scenarioId, characterId }: IScenarioItemProps) {
  const dispatch = useDispatch();
  //시나리오 가져오기
  const scenario = useSelector((state) => state.scenario.characters.find((char) => char.id === characterId)?.scenarios.find((scn) => scn.id === scenarioId));

  //편집 상태 판단
  const isEdit: boolean = useSelector((state) => state.scenario.isEdit);

  //선택 함수
  const handleSelect = () => {
    dispatch(selectEntity({ scenarioId }));
  };

  if (!scenario) {
    return null;
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
            <S.ScenarioTitle>{scenario.name}</S.ScenarioTitle>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <UserCircle />
              <p>{scenario.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{scenario.createdAt}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      ) : (
        <S.ScenarioItem $isChecked={scenario.isChecked} $isSelected={scenario.isSelected} onClick={handleSelect}>
          <S.ScenarioItemLeftSide>
            <S.IconContainer>
              <File />
            </S.IconContainer>
            <S.ScenarioTitle>{scenario.name}</S.ScenarioTitle>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <UserCircle />
              <p>{scenario.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{scenario.createdAt}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      )}
    </>
  );
}
