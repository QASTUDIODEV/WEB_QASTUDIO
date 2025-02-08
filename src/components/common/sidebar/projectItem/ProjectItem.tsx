import { useEffect, useState } from 'react';

import * as S from '@/components/common/sidebar/projectItem/projectItem.style';
import ProjectProfile from '@/components/common/sidebar/projectProfile/projectProfile';

import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import ScenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';

type TProjectItemProps = {
  projects: {
    projectId: Number;
    projectImage: string;
    projectName: string;
  }[];
};

export default function ProjectItem({ projects }: TProjectItemProps) {
  const [menuStates, setMenuStates] = useState<boolean[]>(new Array(projects.length).fill(false));
  useEffect(() => {
    if (projects.length !== menuStates.length) {
      setMenuStates(new Array(projects.length).fill(false));
    }
  }, [projects, menuStates.length]);
  const toggleMenu = (index: number) => {
    setMenuStates((prevStates) => {
      return prevStates.map((state, i) => {
        if (i === index) {
          return !state;
        }
        return state;
      });
    });
  };
  const projectItem = [
    {
      name: 'Dashboard',
      svg: DashboardLogo,
    },
    {
      name: 'Information',
      svg: InformationLogo,
    },
    {
      name: 'Scenario',
      svg: ScenarioLogo,
    },
  ];
  return (
    <S.ProjectList>
      <div>
        {projects &&
          projects.map((project, index) => (
            <div key={index}>
              <S.Project onClick={() => toggleMenu(index)}>
                <S.SemiBox>
                  <S.ProjectProfile className="show content">
                    <ProjectProfile profileImg={project.projectImage || ''} />
                  </S.ProjectProfile>
                  <S.ProjectName className="menu">{project.projectName}</S.ProjectName>
                </S.SemiBox>
                {menuStates[index] ? <ArrowUp className="menu" /> : <ArrowDown className="menu" />}
              </S.Project>
              <S.ProjectContents $isOpen={menuStates[index]} className="menu">
                {projectItem.map((item) => (
                  <S.StyledNavLink to={`/project/${item.name.toLowerCase()}/${project.projectId}`} key={item.name}>
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
          ))}
      </div>
    </S.ProjectList>
  );
}
