import * as S from './projectNum.style';

import Package from '@/assets/icons/package.svg?react';

type TProjectNum = {
  projectNum: number | undefined;
};
export default function ProjectNum({ projectNum }: TProjectNum) {
  return (
    <S.ProjectNum>
      <Package />
      <div className="ProjectNumber">
        {projectNum}
        <span>Projects in progress</span>
      </div>
    </S.ProjectNum>
  );
}
