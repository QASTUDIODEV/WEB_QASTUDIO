import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckBoxFalseIcon from '@/assets/icons/check box_false.svg?react';
import CheckBoxTrueIcon from '@/assets/icons/check box_true.svg?react';
import { toggleAll, toggleCharacter, toggleScenario } from '@/slices/scenarioSlice';
import type { TAppDispatch, TRootState } from '@/store/store';

interface ICheckBoxProps {
  characterId?: number;
  scenarioId?: number;
  isButtonGroup: boolean;
}

export default function CheckBox({ characterId, scenarioId, isButtonGroup }: ICheckBoxProps) {
  const dispatch = useDispatch<TAppDispatch>();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  // 체크 여부 판단
  const isChecked: boolean = useSelector((state: TRootState) => {
    if (isButtonGroup) {
      // ALL
      return state.scenario.characters?.every((char) => Array.isArray(char.scenarios) && char.isChecked && char.scenarios.every((scn) => scn.isChecked));
    }
    if (scenarioId) {
      // 시나리오
      const character = state.scenario.characters?.find((char) => char.id === characterId);
      const scenario = character?.scenarios.scenarioList?.find((scn) => scn.scenarioId === scenarioId);
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
    if (isButtonGroup) {
      setIsAllChecked(!isAllChecked);
      dispatch(toggleAll());
    } else if (scenarioId && characterId) {
      dispatch(toggleScenario({ characterId, scenarioId }));
    } else if (characterId) {
      dispatch(toggleCharacter(characterId));
    }
  };

  return isButtonGroup ? (
    <div onClick={handleCheckBoxClick} style={{ cursor: 'pointer' }}>
      {isAllChecked ? <CheckBoxTrueIcon /> : <CheckBoxFalseIcon />}
    </div>
  ) : (
    <div onClick={handleCheckBoxClick} style={{ cursor: 'pointer' }}>
      {isChecked ? <CheckBoxTrueIcon /> : <CheckBoxFalseIcon />}
    </div>
  );
}
