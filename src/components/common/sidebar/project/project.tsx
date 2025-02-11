import { useState } from 'react';

import type { TProjectDTO } from '@/types/sidebar/sidebar';

import ProjectItems from '@/components/common/sidebar/project/projectItems.tsx';
import * as S from '@/components/common/sidebar/projectItems/projectItems.style';
import ProjectProfile from '@/components/common/sidebar/projectProfile/projectProfile';

import { DownArrow, UpArrow } from '@/assets/icons';

export default function Project({ projectImage, projectId, projectName }: TProjectDTO) {
  const [isClicked, setClicked] = useState(false);

  return (
    <div>
      <S.Project onClick={() => setClicked((prev) => !prev)}>
        <S.SemiBox>
          <S.ProjectProfile className="show content">
            <ProjectProfile profileImg={projectImage || ''} />
          </S.ProjectProfile>
          <S.ProjectName className="menu">{projectName}</S.ProjectName>
        </S.SemiBox>
        {isClicked ? <UpArrow className="menu" /> : <DownArrow className="menu" />}
      </S.Project>
      <S.ProjectContents $isOpen={isClicked} className="menu">
        <ProjectItems projectId={projectId as number} />
      </S.ProjectContents>
    </div>
  );
}
