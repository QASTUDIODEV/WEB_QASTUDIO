import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/sidebar/sidebar.style';

import LogoutModal from './logtoutModal/logoutModal';
import ProjectModal from './projectModal/projectModal';

import Plus from '@/assets/icons/add.svg?react';
import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import SenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import Out from '@/assets/icons/logout.svg?react';
import { selectAuth } from '@/slices/authSlice';

type TUserProfile = {
  id: number;
  name: string;
  profileImg: string;
};

type TProject = {
  id: number;
  name: string;
  owner: TUserProfile;
};

export default function Sidebar() {
  const auth = useSelector(selectAuth);
  const nickname = auth.nickname;
  const userProfile: TUserProfile = {
    id: 1,
    name: nickname || '',
    profileImg: '/path/to/my-profile.jpg',
  };

  const [projects, setProjects] = useState<TProject[]>([
    { id: 1, name: 'UMC_PM_DAY', owner: { id: 2, name: 'user1', profileImg: '/path/to/user1.jpg' } },
    { id: 2, name: 'Project_2', owner: { id: 3, name: 'user2', profileImg: '/path/to/user2.jpg' } },
    { id: 3, name: 'Project_3', owner: userProfile },
  ]);

  const [menuStates, setMenuStates] = useState<boolean[]>(new Array(projects.length).fill(false));
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };
  const logoutShow = () => {
    setLogoutModal(true);
  };
  const logoutHide = () => {
    setLogoutModal(false);
  };
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

  const addProject = () => {
    const newProject: TProject = {
      id: projects.length + 1,
      name: `Project_${projects.length + 1}`,
      owner: userProfile,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setMenuStates((prevStates) => [...prevStates, false]);
  };

  return (
    <S.SideBar ref={sidebarRef}>
      <S.LogoutBox>
        <S.ProjectBox>
          <S.Container>
            <S.StyledNavLink to={`/project`}>
              <Logo width={32} height={32} />
            </S.StyledNavLink>
            <S.StyledNavLink to={`/mypage`}>
              <S.Profile>
                <S.SemiBox>
                  <S.ProfileWrapper className="show project">
                    <Profile />
                  </S.ProfileWrapper>
                  <S.ProfileName className="menu">{userProfile.name}</S.ProfileName>
                </S.SemiBox>
                <ArrowRight className="menu" />
              </S.Profile>
            </S.StyledNavLink>
          </S.Container>
          <S.Projects className="menu">
            <S.ProjectText>Projects</S.ProjectText>
            <Plus
              onClick={() => {
                addProject();
                showModal();
              }}
            />
            {modalShow && <ProjectModal onClose={hideModal} />}
          </S.Projects>
          <div>
            {projects.map((project, index) => (
              <div key={project.id}>
                <S.Project onClick={() => toggleMenu(index)}>
                  <S.SemiBox>
                    <S.ProfileWrapper className="show content">
                      <Profile />
                    </S.ProfileWrapper>
                    <S.ProjectName className="menu">{project.name}</S.ProjectName>
                  </S.SemiBox>
                  {menuStates[index] ? <ArrowUp className="menu" /> : <ArrowDown className="menu" />}
                </S.Project>
                <S.ProjectContents $isOpen={menuStates[index]} className="menu">
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
          </div>
        </S.ProjectBox>
        <S.Logout onClick={logoutShow}>
          <p className="menu">Logout</p>
          <Out />
        </S.Logout>
        {logoutModal && <LogoutModal onClose={logoutHide} />}
      </S.LogoutBox>
    </S.SideBar>
  );
}
