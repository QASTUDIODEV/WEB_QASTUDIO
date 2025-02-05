import React from 'react';

import type { TDetailCharacters } from '@/types/scenario/scenario';

import { formatRelativeTime } from '@/utils/transformDate';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import * as S from '@/components/scenario/characterHeader/characterHeader.style';

import CheckBox from '../checkBox/checkBox';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Calender from '@/assets/icons/calender.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import UserProfile from '@/assets/icons/user_profile.svg?react';

interface ICharacterHeaderProps {
  characterData: TDetailCharacters;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
  isSelected: boolean;
}

export default function CharacterHeader({ characterData, setIsExpanded, isExpanded, isSelected }: ICharacterHeaderProps) {
  const characterId = characterData.characterId;
  //시나리오 가져오기
  const character = useSelector((state) => state.scenario.characters.find((char) => char.id === characterData.characterId));
  //편집 상태 판단
  const isEdit = useSelector((state) => state.scenario.isEdit);

  if (!character) {
    return null;
  }

  return (
    <>
      {isEdit ? (
        <S.CharacterHeader $isChecked={character.isChecked && true} $isEdit={isEdit}>
          <S.CheckboxContainer>
            <S.IconContainer>
              <CheckBox characterId={characterId} isButtonGroup={false} />
            </S.IconContainer>
          </S.CheckboxContainer>
          <S.Container2 onClick={() => setIsExpanded(!isExpanded)}>
            <S.CharacterHeaderLeftSide>
              <S.IconContainer>
                <UserProfile />
              </S.IconContainer>
              <S.CharacterTitle>{characterData.characterName}</S.CharacterTitle>
            </S.CharacterHeaderLeftSide>
            <S.CharacterHeaderRightSide>
              <S.Creater>
                <UserCircle />
                <p>{characterData.author}</p>
              </S.Creater>
              <S.Elapsed>
                <Calender />
                <p>{formatRelativeTime(characterData.createdAt)}</p>
              </S.Elapsed>
            </S.CharacterHeaderRightSide>
          </S.Container2>
        </S.CharacterHeader>
      ) : (
        <S.CharacterHeader $isChecked={character.isChecked} $isEdit={isEdit} $isSelected={isSelected} onClick={() => setIsExpanded(!isExpanded)}>
          <S.CharacterHeaderLeftSide>
            <div style={{ cursor: 'pointer' }}>{isExpanded ? <ArrowUp /> : <ArrowDown />}</div>
            <S.IconContainer>
              <UserProfile />
            </S.IconContainer>
            <S.CharacterTitle>{characterData.characterName}</S.CharacterTitle>
          </S.CharacterHeaderLeftSide>
          <S.CharacterHeaderRightSide>
            <S.Creater>
              <UserCircle />
              <p>{characterData.author}</p>
            </S.Creater>
            <S.Elapsed>
              <Calender />
              <p>{formatRelativeTime(characterData.createdAt)}</p>
            </S.Elapsed>
          </S.CharacterHeaderRightSide>
        </S.CharacterHeader>
      )}
    </>
  );
}
