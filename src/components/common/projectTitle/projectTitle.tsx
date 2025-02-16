import React from 'react';

import { DEVICE, STACK } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/projectTitle/projectTitle.style';

import JSIcon from '@/assets/icons/js.svg?react';
import Mobile from '@/assets/icons/mobile.svg?react';
import NextJSIcon from '@/assets/icons/nextjs.svg?react';
import ReactIcon from '@/assets/icons/react.svg?react';
import Web from '@/assets/icons/web.svg?react';

type TProjectTitleProps = {
  title?: string;
  profileImg?: string | null;
  device?: DEVICE | null;
  stack?: STACK | null;
};
// 아이콘 맵핑
export const stackIconMap: Record<STACK, React.FunctionComponent> = {
  [STACK.NEXT]: NextJSIcon,
  [STACK.REACT]: ReactIcon,
  [STACK.JS]: JSIcon,
};

export const deviceIconMap: Record<DEVICE, React.FunctionComponent> = {
  [DEVICE.PC]: Web,
  [DEVICE.MOBILE]: Mobile,
};

export default function ProjectTitle({ title = 'UNTITLED', profileImg, device, stack }: TProjectTitleProps) {
  return (
    <S.Container>
      <S.IconContainer>
        <Profile profileImg={profileImg || undefined} isProject={true} />
      </S.IconContainer>
      <S.Title>{title}</S.Title>
      {device && <S.IconContainer>{getIcon(deviceIconMap, device)}</S.IconContainer>}
      {stack && <S.IconContainer>{getIcon(stackIconMap, stack)}</S.IconContainer>}
    </S.Container>
  );
}

//사용예시:
//import { DEVICE, STACK } from '@/enums/enums';
//import ProjectTitle from '@/components/common/projectTitle/projectTitle';
//<ProjectTitle title="UMC_PM_DAY" device={DEVICE.MOBILE} stack={STACK.JS} />
