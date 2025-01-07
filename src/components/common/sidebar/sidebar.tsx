import { useEffect, useRef, useState } from 'react';

import * as S from '@/components/common/sidebar/sidebar.style';

import Plus from '@/assets/icons/add.svg?react';
import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import SenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import SearchImg from '@/assets/icons/search.svg?react';

type TUserProfile = {
  id: number;
  name: string;
  profileImg: string;
};

type TProject = {
  id: number;
  name: string;
  owner: TUserProfile; // 생성자 정보
};

export default function Sidebar() {
  // 더미 데이터
  const userProfile: TUserProfile = {
    id: 1,
    name: 'eunji',
    profileImg: '/path/to/my-profile.jpg',
  };

  const [projects, setProjects] = useState<TProject[]>([
    { id: 1, name: 'UMC_PM_DAY', owner: { id: 2, name: 'user1', profileImg: '/path/to/user1.jpg' } },
    { id: 2, name: 'Project_2', owner: { id: 3, name: 'user2', profileImg: '/path/to/user2.jpg' } },
    { id: 3, name: 'Project_3', owner: userProfile }, // 내 프로젝트
  ]);

  const [menuStates, setMenuStates] = useState<boolean[]>(new Array(projects.length).fill(false)); // 프로젝트 토글 상태
  const [hasScroll, setHasScroll] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 이벤트 처리
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

  // 메뉴 토글
  const toggleMenu = (index: number) => {
    setMenuStates((prevStates) => prevStates.map((state, i) => (i === index ? !state : state)));
  };

  // 새로운 프로젝트 추가
  const addProject = () => {
    const newProject: TProject = {
      id: projects.length + 1,
      name: `Project_${projects.length + 1}`,
      owner: userProfile, // 현재 사용자
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setMenuStates((prevStates) => [...prevStates, false]); // 새로운 토글 상태 추가
  };

  return (
    <S.SideBar ref={sidebarRef} hasScroll={hasScroll}>
      {/* 상단 유저 프로필 */}
      <S.Container>
        <Logo width={32} height={32} />
        <S.StyledNavLink to={`/mypage`}>
          <S.Profile>
            <S.SemiBox>
              <S.ProfileImg src={userProfile.profileImg} alt="My Profile" />
              <S.ProfileName>{userProfile.name}</S.ProfileName>
            </S.SemiBox>
            <ArrowRight />
          </S.Profile>
        </S.StyledNavLink>
        <S.Search>
          <SearchImg />
          <S.SearchText placeholder="Search" />
        </S.Search>
      </S.Container>

      {/* 프로젝트 리스트 */}
      <S.Projects>
        <S.ProjectText>Projects</S.ProjectText>
        <Plus onClick={addProject} />
      </S.Projects>

      {projects.map((project, index) => (
        <div key={project.id}>
          <S.Project onClick={() => toggleMenu(index)}>
            <S.SemiBox>
              <S.ProfileImg src={project.owner.profileImg} alt={`${project.owner.name}'s Profile`} />
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
