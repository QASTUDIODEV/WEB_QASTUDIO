import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SOCIAL } from '@/enums/enums';

import * as S from '@/components/auth/socialLogo/socialLogo.style';
import FailModal from '@/components/mypage/failModal/failModal';

import GithubLogo from '@/assets/icons/githubLogo.svg?react';
import GoogleLogo from '@/assets/icons/googleLogo.svg?react';
import KakaoLogo from '@/assets/icons/kakaoLogo.svg?react';

type TSocialLogo = {
  gap: number;
  size: 'small' | 'large';
  disable?: boolean;
  id?: SOCIAL[];
  addAccount?: boolean;
};

export default function SocialLogo({ gap, size, disable, id, addAccount }: TSocialLogo) {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const errorType = urlParams.get('error');

  const [modalShow, setModalShow] = useState(false);

  const hideModal = () => {
    setModalShow(false);
    navigate('/mypage');
  };

  useEffect(() => {
    if (errorType === 'socialLink') {
      setModalShow(true);
    }
  }, [errorType]);

  const handleSocialLogin = (platform: string) => {
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization`;
    const queryParam = addAccount ? '?addSocial=true' : '';
    window.location.href = `${baseUrl}/${platform}${queryParam}`;
  };

  const handleKakaoLogin = () => handleSocialLogin('kakao');
  const handleGithubLogin = () => handleSocialLogin('github');
  const handleGoogleLogin = () => handleSocialLogin('google');

  return (
    <S.Logos $gap={gap} size={size}>
      {modalShow && <FailModal onClose={hideModal} />}
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
