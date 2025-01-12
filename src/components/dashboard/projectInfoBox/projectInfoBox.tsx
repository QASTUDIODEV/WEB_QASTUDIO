import React from 'react';

import * as S from './projectInfoBox.style';

type TProjectInfoBoxProps = {
  label: string;
  icon: React.ReactNode;
  content: string;
  percentLabel?: React.ReactNode;
};

export default function ProjectInfoBox({ label, content, icon, percentLabel }: TProjectInfoBoxProps) {
  return (
    <S.Container>
      <S.LabelWrapper>
        {icon}
        <div>{label}</div>
      </S.LabelWrapper>
      <S.ContentWrapper>
        <S.ContentBox>{content}</S.ContentBox>
        {percentLabel}
      </S.ContentWrapper>
    </S.Container>
  );
}
