import React from 'react';

import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/projectTitle/projectTitle.style';

import JSIcon from '@/assets/icons/js.svg?react';
import Mobile from '@/assets/icons/mobile.svg?react';
import NextJSIcon from '@/assets/icons/nextjs.svg?react';
import ReactIcon from '@/assets/icons/react.svg?react';
import Web from '@/assets/icons/web.svg?react';

type TProjectTitleProps = {
  title?: string;
  profileImg?: string;
  device: DEVICE;
  stack: STACK;
};

export enum STACK {
  NEXT = 'next',
  REACT = 'react',
  JS = 'js',
}

export enum DEVICE {
  PC = 'pc',
  MOBILE = 'mobile',
}

// 아이콘 맵핑
const stackIconMap: Record<string, React.FunctionComponent> = {
  [STACK.NEXT]: NextJSIcon,
  [STACK.REACT]: ReactIcon,
  [STACK.JS]: JSIcon,
};

const deviceIconMap: Record<string, React.FunctionComponent> = {
  [DEVICE.PC]: Web,
  [DEVICE.MOBILE]: Mobile,
};

// 아이콘 반환 함수
function getIcon(map: Record<string, React.FunctionComponent>, key: string): React.ReactNode {
  const Icon = map[key];
  return Icon ? <Icon /> : null;
}

export default function ProjectTitle({ title = 'UNTITLED', profileImg, device = DEVICE.PC, stack = STACK.NEXT }: TProjectTitleProps) {
  return (
    <S.Container>
      <S.ProfileWrapper>
        <Profile profileImg={profileImg} />
      </S.ProfileWrapper>
      <p>{title}</p>
      {getIcon(deviceIconMap, device)}
      {getIcon(stackIconMap, stack)}
    </S.Container>
  );
}

//사용예시:
//<ProjectTitle title="UMC_PM_DAY" device={DEVICE.MOBILE} stack={STACK.JS} />
