import * as S from './projectNum.style';

import Package from '@/assets/icons/package.svg?react';

export default function ProjectNum() {
  return (
    <S.ProjectNum>
      <Package />
      <div className="ProjectNumber">
        3<span>Projects in progress</span>
      </div>
    </S.ProjectNum>
  );
}
