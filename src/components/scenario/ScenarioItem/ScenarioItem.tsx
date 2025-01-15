import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import CheckBox from '@/components/scenario/checkBox/sheckBox';
import * as S from '@/components/scenario/scenarioItem/scenarioItem.style';

import Calender from '@/assets/icons/calender.svg?react';
import File from '@/assets/icons/file.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';

interface IScenarioItemProps {
  scenarioId: number;
  characterId: number;
}

export default function ScenarioItem({ scenarioId, characterId }: IScenarioItemProps) {
  //시나리오 가져오기
  const scenario = useSelector((state) => state.scenario.characters.find((char) => char.id === characterId)?.scenarios.find((scn) => scn.id === scenarioId));

  //편집 상태 판단
  const isEdit: boolean = useSelector((state) => state.scenario.isEdit);

  if (!scenario) {
    return null;
  }

  return (
    <>
      {isEdit ? (
        <S.ScenarioItem isChecked={scenario.isChecked}>
          <S.ScenarioItemLeftSide>
            <CheckBox scenarioId={scenarioId} characterId={characterId} />
            <File />
            <p>{scenario.name}</p>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <Calender width={24} height={24} />
              <p>{scenario.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{scenario.createdAt}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      ) : (
        <S.ScenarioItem isChecked={scenario.isChecked}>
          <S.ScenarioItemLeftSide>
            <File />
            <p>{scenario.name}</p>
          </S.ScenarioItemLeftSide>
          <S.ScenarioRightSide>
            <S.Creater>
              <Calender width={24} height={24} />
              <p>{scenario.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{scenario.createdAt}</p>
            </S.Elapsed>
          </S.ScenarioRightSide>
        </S.ScenarioItem>
      )}
    </>
  );
}
