import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import useProjectList from '@/hooks/sidebar/sidebar';

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

export default function Sidebar() {
  const { useGetProjectList } = useProjectList();
  const { data: projectList } = useGetProjectList;
  const projects = projectList?.result.projectList || [];
  console.log(projectList?.result.projectList);
  const auth = useSelector(selectAuth);
  const nickname = auth.nickname;
  const profile = auth.profileImage;
  const userProfile: TUserProfile = {
    id: 1,
    name: nickname || '',
    profileImg: profile || '',
  };

  const [menuStates, setMenuStates] = useState<boolean[]>(new Array(projects.length).fill(false));
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  useEffect(() => {
    if (projects.length !== menuStates.length) {
      setMenuStates(new Array(projects.length).fill(false));
    }
  }, [projects, menuStates.length]);

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
                    <Profile profileImg={profile || ''} />
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
                showModal();
              }}
            />
            {modalShow && <ProjectModal onClose={hideModal} />}
          </S.Projects>
          <div>
            {projects &&
              projects.map((project, index) => (
                <div key={index}>
                  <S.Project onClick={() => toggleMenu(index)}>
                    <S.SemiBox>
                      <S.ProfileWrapper className="show content">
                        <Profile />
                      </S.ProfileWrapper>
                      <S.ProjectName className="menu">{project.projectName}</S.ProjectName>
                    </S.SemiBox>
                    {menuStates[index] ? <ArrowUp className="menu" /> : <ArrowDown className="menu" />}
                  </S.Project>
                  <S.ProjectContents $isOpen={menuStates[index]} className="menu">
                    <S.StyledNavLink to={`/project/dashboard/${project.projectId}`}>
                      {({ isActive }) => (
                        <S.ProjectContent $isActive={isActive}>
                          <DashboardLogo />
                          <S.ProjectContentName>Dashboard</S.ProjectContentName>
                        </S.ProjectContent>
                      )}
                    </S.StyledNavLink>
                    <S.StyledNavLink to={`/project/information/${project.projectId}`}>
                      {({ isActive }) => (
                        <S.ProjectContent $isActive={isActive}>
                          <InformationLogo />
                          <S.ProjectContentName>Information</S.ProjectContentName>
                        </S.ProjectContent>
                      )}
                    </S.StyledNavLink>
                    <S.StyledNavLink to={`/project/scenario/${project.projectId}`}>
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
