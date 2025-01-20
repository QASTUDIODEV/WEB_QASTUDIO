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
  const kakaoLoginUrl = `${import.meta.env.VITE_KAKAO_URL}?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
  // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  return (
    <S.Logos $gap={gap} size={size}>
      {id ? (
        <>
          {id?.includes(SOCIAL.GOOGLE) && (
            <S.Logo $logotype="google" size={size} disabled={disable}>
              <GoogleLogo />
            </S.Logo>
          )}
          {id?.includes(SOCIAL.KAKAO) && (
            <S.Logo $logotype="kakao" size={size} disabled={disable}>
              <KakaoLogo />
            </S.Logo>
          )}
          {id?.includes(SOCIAL.GITHUB) && (
            <S.Logo $logotype="github" $isgithub="true" size={size} disabled={disable}>
              <GithubLogo />
            </S.Logo>
          )}
        </>
      ) : (
        <>
          <S.Logo $logotype="google" size={size} disabled={disable}>
            <GoogleLogo />
          </S.Logo>
          <S.Logo
            $logotype="kakao"
            size={size}
            disabled={disable}
            onClick={() => {
              location.href = kakaoLoginUrl;
            }}
          >
            <KakaoLogo />
          </S.Logo>
          <S.Logo $logotype="github" $isgithub="true" size={size} disabled={disable}>
            <GithubLogo />
          </S.Logo>
        </>
      )}
    </S.Logos>
  );
}
