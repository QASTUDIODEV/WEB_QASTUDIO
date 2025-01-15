import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '@/components/common/modal/modal';
import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/sidebar/sidebar.style';

import Button from '../button/button';
import Input from '../input/input';

import Plus from '@/assets/icons/add.svg?react';
import ArrowDown from '@/assets/icons/arrow_down.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import Cam from '@/assets/icons/camera.svg?react';
import Delete from '@/assets/icons/del_circle.svg?react';
import SenarioLogo from '@/assets/icons/file_branch.svg?react';
import DashboardLogo from '@/assets/icons/grid.svg?react';
import InformationLogo from '@/assets/icons/info.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import Out from '@/assets/icons/logout.svg?react';

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
  const navigate = useNavigate();
  const userProfile: TUserProfile = {
    id: 1,
    name: 'eunji',
    profileImg: '/path/to/my-profile.jpg',
  };

  const [projects, setProjects] = useState<TProject[]>([
    { id: 1, name: 'UMC_PM_DAY', owner: { id: 2, name: 'user1', profileImg: '/path/to/user1.jpg' } },
    { id: 2, name: 'Project_2', owner: { id: 3, name: 'user2', profileImg: '/path/to/user2.jpg' } },
    { id: 3, name: 'Project_3', owner: userProfile },
  ]);

  const [menuStates, setMenuStates] = useState<boolean[]>(new Array(projects.length).fill(false));
  const [logoutPosition, setLogoutPosition] = useState<'absolute' | 'relative'>('absolute');
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef(0);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (projectRef.current >= 3) {
      setLogoutPosition('relative');
    } else {
      setLogoutPosition('absolute');
    }
  }, [menuStates]);
  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };
  const toggleMenu = (index: number) => {
    setMenuStates((prevStates) => {
      return prevStates.map((state, i) => {
        if (i === index) {
          if (!state) {
            projectRef.current = projectRef.current + 1;
          } else {
            projectRef.current = projectRef.current - 1;
          }
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <S.SideBar ref={sidebarRef}>
      <S.Container>
        <Logo width={32} height={32} />
        <S.StyledNavLink to={`/mypage`}>
          <S.Profile>
            <S.SemiBox>
              <S.ProfileWrapper>
                <Profile />
              </S.ProfileWrapper>
              <S.ProfileName>{userProfile.name}</S.ProfileName>
            </S.SemiBox>
            <ArrowRight />
          </S.Profile>
        </S.StyledNavLink>
      </S.Container>
      <S.Projects>
        <S.ProjectText>Projects</S.ProjectText>
        <Plus
          onClick={() => {
            addProject();
            showModal();
          }}
        />
        {modalShow && (
          <Modal
            title="Create Project"
            children={
              <S.ModalBox>
                <S.ProjectText>Register ongoing project info (Web only).</S.ProjectText>
                <S.PostBox>
                  <S.ModalText>Project Image</S.ModalText>
                  <Cam />
                </S.PostBox>
                <S.PostBox>
                  <S.ModalText>Project Name</S.ModalText>
                  <Input placeholder="Enter project title." />
                </S.PostBox>
                <S.PostBox>
                  <S.ModalText>Project URL</S.ModalText>
                  <Input placeholder="Enter the deployed project URL" />
                </S.PostBox>
                <S.PostBox>
                  <S.ModalText>Share this project</S.ModalText>
                  <S.BtnWrapper>
                    <Input placeholder="Invite others by email" />
                    <Button type="normal" color="blue">
                      Share
                    </Button>
                  </S.BtnWrapper>
                  <S.BtnWrapper>
                    <Button type="tag" color="mint" icon={<Delete />} iconPosition="right">
                      dfsfd@gmail.com
                    </Button>
                    <Button type="tag" color="mint" icon={<Delete />} iconPosition="right">
                      ek5348@naver.com
                    </Button>
                  </S.BtnWrapper>
                </S.PostBox>
                <S.PostBox>
                  <S.Position>
                    <Button type="normal" color="blue">
                      Create
                    </Button>
                  </S.Position>
                </S.PostBox>
              </S.ModalBox>
            }
            onClose={hideModal}
          />
        )}
      </S.Projects>

      {projects.map((project, index) => (
        <div key={project.id}>
          <S.Project onClick={() => toggleMenu(index)}>
            <S.SemiBox>
              <S.ProfileWrapper>
                <Profile />
              </S.ProfileWrapper>
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
      <S.Logout style={{ position: logoutPosition }} onClick={handleLogout}>
        Logout
        <Out />
      </S.Logout>
    </S.SideBar>
  );
}
