import { useState } from 'react';

import type { TProjectDTO } from '@/types/sidebar/sidebar';
import { projectItem } from '@/constants/projectToggle/projectToggle';

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
        {projectItem.map((item) => (
          <S.StyledNavLink to={`/project/${item.name.toLowerCase()}/${projectId}`} key={item.name}>
            {({ isActive }) => (
              <S.ProjectContent $isActive={isActive}>
                <item.svg width={19.2} height={19.2} />
                <S.ProjectContentName>{item.name}</S.ProjectContentName>
              </S.ProjectContent>
            )}
          </S.StyledNavLink>
        ))}
      </S.ProjectContents>
    </div>
  );
}
