import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/projectTitle/projectTitle.style';

import JSIcon from '@/assets/icons/js.svg?react';
import Mobile from '@/assets/icons/mobile.svg?react';
import NextJSIcon from '@/assets/icons/nextjs.svg?react';
import ReactIcon from '@/assets/icons/react.svg?react';
import Web from '@/assets/icons/web.svg?react';

type TModalProps = { title?: string; profileImg?: string; device?: string; stack?: string };

export default function ProjectTitle({ title = 'UNTITLED', profileImg = undefined, device = 'pc', stack = 'next.js' }: TModalProps) {
  return (
    <S.Container>
      <S.ProfileWrapper>
        <Profile profileImg={profileImg} />
      </S.ProfileWrapper>
      <p>{title}</p>
      {device == 'pc' ? <Web /> : device == 'mobile' ? <Mobile /> : <Web />}
      {stack == 'next.js' ? <NextJSIcon /> : stack == 'react' ? <ReactIcon /> : stack == 'js' ? <JSIcon /> : <NextJSIcon />}
    </S.Container>
  );
}

// 사용 예시:
// import ProjectTitle from '@/components/common/projectTitle/projectTitle';
// <ProjectTitle title="UMC_PM_DAY" profileImg="/icons/logo.svg" device="mobile" stack="react" />
