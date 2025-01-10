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
}

export default function CharacterHeader({ characterId }: ICharacterHeaderProps) {
  const dispatch = useDispatch<TAppDispatch>();
  //시나리오 가져오기
  const character = useSelector((state: TRootState) => state.scenario.characters.find((char) => char.id === characterId));
  //편집 상태 판단
  const isEdit: boolean = useSelector((state: TRootState) => state.scenario.isEdit);

  // 펼치기 토글 함수
  const handleExpandToggle = () => {
    dispatch(toggleExpand(characterId));
  };

  if (!character) {
    return null;
  }

  return (
    <>
      {isEdit ? (
        <S.CharacterHeader isChecked={character.isChecked} isEdit={isEdit}>
          <S.CharacterHeaderLeftSide>
            <CheckBox characterId={characterId} />
            <UserProfile />
            <p>{character.title}</p>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <Calender />
              <p>{character.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{character.createdAt}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      ) : (
        <S.CharacterHeader isChecked={character.isChecked}>
          <S.CharacterHeaderLeftSide>
            <div onClick={handleExpandToggle} style={{ cursor: 'pointer' }}>
              {character.isExpanded ? <ArrowDown /> : <ArrowUp />}
            </div>
            <UserProfile />
            <p>{character.title}</p>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <Calender />
              <p>{character.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <UserCircle />
              <p>{character.createdAt}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      )}
    </>
  );
}
