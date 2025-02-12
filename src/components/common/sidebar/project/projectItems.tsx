import { memo } from 'react';

import { projectItem } from '@/constants/projectToggle/projectToggle';

import * as S from '@/components/common/sidebar/projectItems/projectItems.style';

type TProps = {
  projectId: number;
};

function ProjectItems({ projectId }: TProps) {
  return (
    <>
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
    </>
  );
}

export default memo(ProjectItems);
