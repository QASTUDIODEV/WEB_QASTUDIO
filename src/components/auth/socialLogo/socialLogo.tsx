import * as S from '@/components/auth/socialLogo/socialLogo.style';

import GithubLogo from '@/assets/icons/githubLogo.svg?react';
import GoogleLogo from '@/assets/icons/googleLogo.svg?react';
import KakaoLogo from '@/assets/icons/KakaoLogo.svg?react';

type TSocialLogo = {
  gap: number;
  size: 'small' | 'large';
  disable?: boolean;
  id?: ('github' | 'kakao' | 'google')[] | null;
};

export default function SocialLogo({ gap, size, disable, id }: TSocialLogo) {
  return (
    <S.Logos gap={gap} size={size}>
      {id ? (
        <>
          {id?.includes('google') && (
            <S.Logo color="#ffffff" size={size} disabled={disable}>
              <GoogleLogo />
            </S.Logo>
          )}
          {id?.includes('kakao') && (
            <S.Logo color="#FEE500" size={size} disabled={disable}>
              <KakaoLogo />
            </S.Logo>
          )}
          {id?.includes('github') && (
            <S.Logo color="black" isGithub={true} size={size} disabled={disable}>
              <GithubLogo />
            </S.Logo>
          )}
        </>
      ) : (
        <>
          <S.Logo color="#ffffff" size={size} disabled={disable}>
            <GoogleLogo />
          </S.Logo>
          <S.Logo color="#FEE500" size={size} disabled={disable}>
            <KakaoLogo />
          </S.Logo>
          <S.Logo color="black" isGithub={true} size={size} disabled={disable}>
            <GithubLogo />
          </S.Logo>
        </>
      )}
    </S.Logos>
  );
}
