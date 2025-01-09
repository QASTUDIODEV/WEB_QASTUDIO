import { useDispatch, useSelector } from 'react-redux';

import * as S from '@/components/scenario/CharacterHeader/CharacterHeader.style';
import CheckBox from '@/components/scenario/CheckBox/CheckBox';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Calender from '@/assets/icons/calender.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import UserProfile from '@/assets/icons/user_profile.svg?react';
import { toggleExpand } from '@/slices/scenarioSlice';
import type { TAppDispatch, TRootState } from '@/store/store';

interface ICharacterHeaderProps {
  characterId: number;
  title: string;
  createdBy: string;
  createdAt: string;
  isExpanded: boolean;
}

export default function CharacterHeader({ characterId, title, createdBy, createdAt, isExpanded }: ICharacterHeaderProps) {
  const dispatch = useDispatch<TAppDispatch>();
  const isEdit = useSelector((state: TRootState) => state.scenario.isEdit);

  // 아이콘 클릭 시 펼치기/접기 토글
  const handleExpandToggle = () => {
    dispatch(toggleExpand(characterId));
  };

  return (
    <>
      {isEdit ? (
        <S.CharacterHeader>
          <S.CharacterHeaderLeftSide>
            <CheckBox characterId={characterId} />
            <UserProfile />
            <p>{title}</p>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <Calender />
              <p>{createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{createdAt}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      ) : (
        <S.CharacterHeader>
          <S.CharacterHeaderLeftSide>
            {/* ✅ isExpanded 상태에 따라 아이콘 변경 */}
            <div onClick={handleExpandToggle} style={{ cursor: 'pointer' }}>
              {isExpanded ? <ArrowDown /> : <ArrowUp />}
            </div>
            <UserProfile />
            <p>{title}</p>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <Calender />
              <p>{createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{createdAt}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      )}
    </>
  );
}
