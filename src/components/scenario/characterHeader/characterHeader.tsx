import { formatRelativeTime } from '@/utils/transformDate';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';

import * as S from '@/components/scenario/characterHeader/characterHeader.style';

import CheckBox from '../checkBox/checkBox';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Calender from '@/assets/icons/calender.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import UserProfile from '@/assets/icons/user_profile.svg?react';
import { selectEntity, toggleExpand } from '@/slices/scenarioSlice';

interface ICharacterHeaderProps {
  characterId: number;
}

export default function CharacterHeader({ characterId }: ICharacterHeaderProps) {
  const dispatch = useDispatch();

  //시나리오 가져오기
  const character = useSelector((state) => state.scenario.characters.find((char) => char.id === characterId));

  //편집 상태 판단
  const isEdit: boolean = useSelector((state) => state.scenario.isEdit);

  // 펼치기 토글 함수
  const handleExpandToggle = () => {
    dispatch(toggleExpand(characterId));
  };

  //선택 함수
  const handleSelect = () => {
    dispatch(selectEntity({ characterId, scenarioId: null }));
  };

  if (!character) {
    return null;
  }

  return (
    <>
      {isEdit ? (
        <S.CharacterHeader $isChecked={character.isChecked && true} $isEdit={isEdit}>
          <S.CharacterHeaderLeftSide>
            <S.IconContainer>
              <CheckBox characterId={characterId} />
            </S.IconContainer>
            <S.IconContainer>
              <UserProfile />
            </S.IconContainer>
            <S.CharacterTitle>{character.title}</S.CharacterTitle>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <UserCircle />
              <p>{character.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{formatRelativeTime(character.createdAt)}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      ) : (
        <S.CharacterHeader $isChecked={character.isChecked} $isEdit={isEdit} $isSelected={character.isSelected} onClick={handleSelect}>
          <S.CharacterHeaderLeftSide>
            <div onClick={handleExpandToggle} style={{ cursor: 'pointer' }}>
              {character.isExpanded ? <ArrowUp /> : <ArrowDown />}
            </div>

            <S.IconContainer>
              <UserProfile />
            </S.IconContainer>
            <S.CharacterTitle>{character.title}</S.CharacterTitle>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <UserCircle />
              <p>{character.createdBy}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{formatRelativeTime(character.createdAt)}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      )}
    </>
  );
}
