import { useState } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenario/buttonGroup/buttonGroup.style';
import CheckBox from '@/components/scenario/checkBox/checkBox';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/del.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ExclamationCircle from '@/assets/icons/exclamation_circle.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { openModal } from '@/slices/modalSlice.ts';
import { edit, resetChecks } from '@/slices/scenarioSlice';

export default function ButtonGroup() {
  const dispatch = useDispatch();
  const { isEdit, characters } = useSelector((state) => state.scenario);

  // 체크 여부 판단
  const [hasCheckedItems, setHasCheckedItems] = useState<boolean>(false);

  // Delete 버튼 클릭 함수
  const handleDeleteClick = (): void => {
    const hasChecked = characters.some((character) => character.isChecked || character.scenarios.some((scenario) => scenario.isChecked));
    setHasCheckedItems(hasChecked);

    if (hasChecked) {
      dispatch(edit());
      dispatch(resetChecks());
      setHasCheckedItems(true);
    }
  };

  // Done 버튼 클릭 함수
  const handleDoneClick = (): void => {
    dispatch(edit());
    dispatch(resetChecks());
    setHasCheckedItems(true);
  };

  // Edit 버튼 클릭 함수
  const handleEditClick = (): void => {
    dispatch(edit());
    dispatch(resetChecks());
    setHasCheckedItems(true);
  };

  // Play 버튼 클릭 함수
  const handlePlayClick = (): void => {
    // 시나리오 시작 페이지로 이동하기
  };

  // + Character 버튼 클릭 함수
  const handleAddClick = (): void => {
    // 역할 추가 모달 띄우기
    dispatch(openModal('scenarioModal'));
  };

  return (
    <>
      {isEdit ? (
        <S.EditButtonGroup>
          <S.AllCheckBoxGroup>
            <CheckBox isAllCheckBox={true} />
            <p>ALL</p>
            {!hasCheckedItems && (
              <S.ErrorMessage>
                <ExclamationCircle />
                You must select at least one.
              </S.ErrorMessage>
            )}
          </S.AllCheckBoxGroup>
          <S.ButtonGroup>
            <Button type="normal" color="default" disabled={false} icon={<Delete />} iconPosition="left" onClick={handleDeleteClick}>
              Delete
            </Button>
            <Button type="normal" color="default" disabled={false} icon={<Done />} iconPosition="left" onClick={handleDoneClick}>
              Done
            </Button>
          </S.ButtonGroup>
        </S.EditButtonGroup>
      ) : (
        <S.ButtonGroup>
          <Button type="normal" color="default" disabled={false} icon={<Play />} iconPosition="right" onClick={handlePlayClick}>
            Play
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Edit />} iconPosition="left" onClick={handleEditClick}>
            Edit
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Add />} iconPosition="left" onClick={handleAddClick}>
            Character
          </Button>
        </S.ButtonGroup>
      )}
    </>
  );
}
