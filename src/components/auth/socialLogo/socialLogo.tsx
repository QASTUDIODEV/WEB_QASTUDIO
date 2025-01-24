import { SOCIAL } from '@/enums/enums';

import * as S from '@/components/auth/socialLogo/socialLogo.style';

import GithubLogo from '@/assets/icons/githubLogo.svg?react';
import GoogleLogo from '@/assets/icons/googleLogo.svg?react';
import KakaoLogo from '@/assets/icons/kakaoLogo.svg?react';

type TSocialLogo = {
  gap: number;
  size: 'small' | 'large';
  disable?: boolean;
  id?: SOCIAL[];
};

export default function SocialLogo({ gap, size, disable, id }: TSocialLogo) {
  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };
  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/github`;
  };
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  };
  return (
    <S.Logos $gap={gap} size={size}>
      {id ? (
        <>
          {id?.includes(SOCIAL.GOOGLE) && (
            <S.Logo $logotype="google" size={size} disabled={disable} onClick={handleGoogleLogin}>
              <GoogleLogo />
            </S.Logo>
          )}
          {id?.includes(SOCIAL.KAKAO) && (
            <S.Logo $logotype="kakao" size={size} disabled={disable} onClick={handleKakaoLogin}>
              <KakaoLogo />
            </S.Logo>
          )}
          {id?.includes(SOCIAL.GITHUB) && (
            <S.Logo $logotype="github" $isgithub="true" size={size} disabled={disable} onClick={handleGithubLogin}>
              <GithubLogo />
            </S.Logo>
          )}
        </>
      ) : (
        <>
          <S.Logo $logotype="google" size={size} disabled={disable} onClick={handleGoogleLogin}>
            <GoogleLogo />
          </S.Logo>

          <S.Logo $logotype="kakao" size={size} disabled={disable} onClick={handleKakaoLogin}>
            <KakaoLogo />
          </S.Logo>

          <S.Logo $logotype="github" $isgithub="true" size={size} disabled={disable} onClick={handleGithubLogin}>
            <GithubLogo />
          </S.Logo>
        </>
      )}
    </S.Logos>
  );
}
