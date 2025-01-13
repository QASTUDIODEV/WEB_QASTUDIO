import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/projectTitle/projectTitle.style';

import Mobile from '@/assets/icons/mobile.svg?react';
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
      {stack == 'next.js' ? <Web /> : stack == 'react' ? <Web /> : stack == 'js' ? <Web /> : <Web />}
    </S.Container>
  );
}

// 사용 예시: <ProjectTitle title="My Mobile App" profileImg="/icons/logo.svg" device="mobile" stack="react" />
