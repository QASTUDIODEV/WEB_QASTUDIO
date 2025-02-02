import { useDispatch, useSelector } from 'react-redux';

import CheckBoxFalseIcon from '@/assets/icons/check box_false.svg?react';
import CheckBoxTrueIcon from '@/assets/icons/check box_true.svg?react';
import { toggleAll, toggleCharacter, toggleScenario } from '@/slices/scenarioSlice';
import type { TAppDispatch, TRootState } from '@/store/store';

interface ICheckBoxProps {
  characterId?: number;
  scenarioId?: number;
  isAllCheckBox?: boolean;
}

export default function CheckBox({ characterId, scenarioId, isAllCheckBox = false }: ICheckBoxProps) {
  const dispatch = useDispatch<TAppDispatch>();

  // 체크 여부 판단
  const isChecked: boolean = useSelector((state: TRootState) => {
    if (isAllCheckBox) {
      // ALL
      // state.scenario.characters가 정의되어 있는지 확인하고, 각 character.scenarios가 배열인지 확인
      return state.scenario.characters?.every((char) => Array.isArray(char.scenarios) && char.isChecked && char.scenarios.every((scn) => scn.isChecked));
    }
    if (scenarioId) {
      // 시나리오
      const character = state.scenario.characters?.find((char) => char.id === characterId);
      const scenario = character?.scenarios?.find((scn) => scn.id === scenarioId);
      return scenario?.isChecked ?? false;
    }
    if (characterId) {
      // 역할
      const character = state.scenario.characters?.find((char) => char.id === characterId);
      return character?.isChecked ?? false;
    }
    return false;
  });

  // 클릭 함수
  const handleCheckBoxClick = (): void => {
    if (isAllCheckBox) {
      dispatch(toggleAll());
    } else if (scenarioId && characterId) {
      dispatch(toggleScenario({ characterId, scenarioId }));
    } else if (characterId) {
      dispatch(toggleCharacter(characterId));
    }
  };

  return (
    <div onClick={handleCheckBoxClick} style={{ cursor: 'pointer' }}>
      {isChecked ? <CheckBoxTrueIcon /> : <CheckBoxFalseIcon />}
    </div>
  );
}
