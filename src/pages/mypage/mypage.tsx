import Profile from '@/components/common/profile/profile';

import * as S from '@/pages/mypage/mypage.style';

export default function MyPage() {
  return (
    <S.Container>
      <span>My Page</span>
      <S.ProfileWrapper>
        <Profile />
        <S.UserInfo>
          <span>eunji</span>
          <S.Account>email.email.com</S.Account>
        </S.UserInfo>
      </S.ProfileWrapper>
    </S.Container>
  );
}
