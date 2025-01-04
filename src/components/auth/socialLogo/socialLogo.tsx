import * as S from '@/components/auth/socialLogo/socialLogo.style';

import GithubLogo from '@/assets/icons/githubLogo.svg?react';
import GoogleLogo from '@/assets/icons/googleLogo.svg?react';
import KakaoLogo from '@/assets/icons/KakaoLogo.svg?react';

export default function SocialLogo() {
  return (
    <S.LoginButtons>
      <S.Logo color="#ffffff">
        <GoogleLogo />
      </S.Logo>
      <S.Logo color="#FEE500">
        <KakaoLogo />
      </S.Logo>
      <S.Logo color="black">
        <GithubLogo style={{ width: '40px', height: '40px' }} />
      </S.Logo>
    </S.LoginButtons>
  );
}
