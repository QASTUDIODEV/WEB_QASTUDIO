import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenario/ButtonGroup/ButtonGroup.style';
import CheckBox from '@/components/scenario/CheckBox/CheckBox';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/del.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { edit } from '@/slices/scenarioSlice';
import type { TAppDispatch, TRootState } from '@/store/store';

export default function ButtonGroup() {
  const dispatch = useDispatch<TAppDispatch>();
  const isEdit = useSelector((state: TRootState) => state.scenario.isEdit);

  // Edit 버튼 클릭 함수
  const handleEditClick = () => {
    dispatch(edit());
  };

  // Done 버튼 클릭 함수
  const handleDoneClick = () => {
    dispatch(edit());
  };

  // 체크박스 추가 동작
  const handleAllCheckBoxClick = () => {
    console.log('All checkbox clicked!');
  };

  return (
    <>
      {isEdit ? (
        <S.EditButtonGroup>
          <S.AllCheckBoxGroup>
            <CheckBox onClick={handleAllCheckBoxClick} />
            <p>ALL</p>
          </S.AllCheckBoxGroup>
          <S.ButtonGroup>
            <Button type="normal" color="default" disabled={false} icon={<Delete />} iconPosition="left">
              Delete
            </Button>
            <Button type="normal" color="default" disabled={false} icon={<Done />} iconPosition="left" onClick={handleDoneClick}>
              Done
            </Button>
          </S.ButtonGroup>
        </S.EditButtonGroup>
      ) : (
        <S.ButtonGroup>
          <Button type="normal" color="default" disabled={false} icon={<Play />} iconPosition="right">
            Play
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Edit />} iconPosition="left" onClick={handleEditClick}>
            Edit
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Add />} iconPosition="left">
            Scenario
          </Button>
        </S.ButtonGroup>
      )}
    </>
  );
}
