import * as S from '@/components/socialLogo/socialLogo.style';

import GithubLogo from '@/image/githubLogo.svg';
import GoogleLogo from '@/image/googleLogo.svg';
import KakaoLogo from '@/image/KakaoLogo.svg';

export default function SocialLogo() {
  return (
    <S.LoginButtons>
      <S.Logo color="#ffffff">
        <img src={GoogleLogo} alt="" />
      </S.Logo>
      <S.Logo color="#FEE500">
        <img src={KakaoLogo} alt="" />
      </S.Logo>
      <S.Logo color="black">
        <img src={GithubLogo} alt="" />
      </S.Logo>
    </S.LoginButtons>
  );
}