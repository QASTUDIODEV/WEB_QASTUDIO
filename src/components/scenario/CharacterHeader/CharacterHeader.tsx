import { useDispatch, useSelector } from 'react-redux';

import * as S from '@/components/scenario/CharacterHeader/CharacterHeader.style';
import CheckBox from '@/components/scenario/CheckBox/CheckBox';

import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Calender from '@/assets/icons/calender.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import UserProfile from '@/assets/icons/user_profile.svg?react';
import type { TAppDispatch, TRootState } from '@/store/store';

interface ICharacterHeaderProps {
  title: string;
  createdBy: string;
  createdAt: string;
}

export default function CharacterHeader({ title, createdBy, createdAt }: ICharacterHeaderProps) {
  // const dispatch = useDispatch<TAppDispatch>();
  const isEdit = useSelector((state: TRootState) => state.scenario.isEdit);
  return (
    <>
      {isEdit ? (
        <S.CharacterHeader>
          <S.CharacterHeaderLeftSide>
            <CheckBox />
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
            <ArrowUp />
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
