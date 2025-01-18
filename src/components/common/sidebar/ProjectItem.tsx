import * as S from '@/components/common/sidebar/sidebar.style';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import SenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';
import ProjectLogo from '@/assets/icons/package.svg?react';

interface IProject {
  id: number;
  name: string;
  isOpen: boolean;
}

interface IProjectItemProps {
  project: IProject;
  toggleProject: (id: number) => void;
}

export default function ProjectItem({ project, toggleProject }: IProjectItemProps) {
  return (
    <div>
      <S.Project onClick={() => toggleProject(project.id)}>
        <S.SemiBox>
          <ProjectLogo />
          <S.ProjectName>{project.name}</S.ProjectName>
        </S.SemiBox>
        {project.isOpen ? <ArrowUp /> : <ArrowDown />}
      </S.Project>
      <S.ProjectContents $isOpen={project.isOpen}>
        <S.StyledNavLink to={`/project/dashboard/${project.id}`}>
          {({ isActive }) => (
            <S.ProjectContent $isActive={isActive}>
              <DashboardLogo />
              <S.ProjectContentName>Dashboard</S.ProjectContentName>
            </S.ProjectContent>
          )}
        </S.StyledNavLink>
        <S.StyledNavLink to={`/project/information/${project.id}`}>
          {({ isActive }) => (
            <S.ProjectContent $isActive={isActive}>
              <InformationLogo />
              <S.ProjectContentName>Information</S.ProjectContentName>
            </S.ProjectContent>
          )}
        </S.StyledNavLink>
        <S.StyledNavLink to={`/project/scenario/${project.id}`}>
          {({ isActive }) => (
            <S.ProjectContent $isActive={isActive}>
              <SenarioLogo />
              <S.ProjectContentName>Scenario</S.ProjectContentName>
            </S.ProjectContent>
          )}
        </S.StyledNavLink>
      </S.ProjectContents>
    </div>
  );
}
