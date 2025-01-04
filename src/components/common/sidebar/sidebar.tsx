import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/common/sidebar/sidebar.style';

import Plus from '@/assets/icons/add.svg?react';
import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import SenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import ProjectLogo from '@/assets/icons/package.svg?react';
import SearchImg from '@/assets/icons/search.svg?react';

export default function Sidebar() {
  const [menuStates, setMenuStates] = useState([false, false, false]);
  const [hasScroll, setHasScroll] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (index: number) => {
    setMenuStates((prevStates) => prevStates.map((state, i) => (i === index ? !state : state)));
  };

  const projects = [
    { id: 1, name: 'UMC_PM_DAY' },
    { id: 2, name: 'Project_2' },
    { id: 3, name: 'Project_3' },
  ];

  const handleScroll = () => {
    setHasScroll(true);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      sidebar.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <S.SideBar ref={sidebarRef} hasScroll={hasScroll}>
      <S.Container>
        <Logo width={32} height={32} />
        <S.Profile>
          <S.ProfileImg />
          <S.ProfileName>eunji</S.ProfileName>
        </S.Profile>
        <S.Search>
          <SearchImg />
          <S.SearchText placeholder="Search" />
        </S.Search>
      </S.Container>

      <S.Projects>
        <S.ProjectText>Projects</S.ProjectText>
        <Plus />
      </S.Projects>

      {projects.map((project, index) => (
        <div key={project.id}>
          <S.Project onClick={() => toggleMenu(index)}>
            <S.SemiBox>
              <ProjectLogo />
              <S.ProjectName>{project.name}</S.ProjectName>
            </S.SemiBox>
            {menuStates[index] ? <ArrowUp /> : <ArrowDown />}
          </S.Project>
          <S.ProjectContents $isOpen={menuStates[index]}>
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
      ))}

      {/* 하단 여백 */}
      {hasScroll && <S.FooterPadding />}
    </S.SideBar>
  );
}
