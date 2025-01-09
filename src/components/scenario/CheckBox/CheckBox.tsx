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
  const isChecked = useSelector((state: TRootState) => {
    if (isAllCheckBox) {
      return state.scenario.characters.every((char) => char.isChecked);
    }
    if (scenarioId) {
      const character = state.scenario.characters.find((char) => char.id === characterId);
      const scenario = character?.scenarios.find((scn) => scn.id === scenarioId);
      return scenario?.isChecked ?? false;
    }
    if (characterId) {
      const character = state.scenario.characters.find((char) => char.id === characterId);
      return character?.isChecked ?? false;
    }
    return false;
  });

  // 클릭 함수
  const handleCheckBoxClick = () => {
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
