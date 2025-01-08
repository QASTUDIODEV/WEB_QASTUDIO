import * as S from '@/components/scenario/CharacterHeader/CharacterHeader.style';

import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Calender from '@/assets/icons/calender.svg?react';
import UserCircle from '@/assets/icons/user_circle.svg?react';
import UserProfile from '@/assets/icons/user_profile.svg?react';

export default function CharacterHeader() {
  return (
    <S.CharacterHeader>
      <S.CharacterHeaderLeftSide>
        <ArrowUp />
        <UserProfile />
        <p>로그인을 하려는 일반인</p>
      </S.CharacterHeaderLeftSide>

      <S.CharacterHeaderRightSide>
        <S.Creater>
          <Calender width={24} height={24} />
          <p>작성자 1</p>
        </S.Creater>
        <S.Elapsed>
          <UserCircle />
          <p>a few seconds ago</p>
        </S.Elapsed>
      </S.CharacterHeaderRightSide>
    </S.CharacterHeader>
  );
}
