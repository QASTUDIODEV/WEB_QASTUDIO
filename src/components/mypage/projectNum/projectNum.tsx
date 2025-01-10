import * as S from './projectNum.style';

import Package from '@/assets/icons/package.svg?react';

export default function ProjectNum() {
  return (
    <S.ProjectNum>
      <Package />
      <div className="ProjectNumber">3</div>
      <span>Projects in progress</span>
    </S.ProjectNum>
  );
}
