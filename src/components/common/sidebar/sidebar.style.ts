import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SideBar = styled.div<{ hasScroll: boolean }>`
  min-width: 280px;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(76.11deg, ${theme.colors.primary.pri_700} 0%, ${theme.colors.primary.pri_900} 100.13%)`};
  position: sticky;
  overflow-y: auto;
  top: 0;
  color: #d6deec;
  scrollbar-width: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15.313% 10.938% 0 10.938%;
`;

export const Profile = styled.div`
  padding-top: 14.0625%;
  display: flex;
  align-items: center;
  gap: 2.5%;
  cursor: pointer;
`;

export const ProfileName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;
export const ProfileWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

export const Projects = styled.div`
  margin-top: 26.09%;
  padding: 0 10.938%;
  padding-bottom: 10.625%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ProjectText = styled.p`
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;

export const Project = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4.602% 10.625%;
  gap: 8px;
  cursor: pointer;
`;

export const SemiBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4.05%;
`;

export const ProjectName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: #d6deec;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
`;

export const ProjectContent = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 2.5%;
  padding: 4.602% 0% 4.602% 15.625%;
  background: ${({ $isActive }) => ($isActive ? 'rgba(223, 232, 249, 0.1)' : 'transparent')};
`;
export const ModalBox = styled.div`
  gap: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;
export const PostBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const ModalText = styled.p`
  ${({ theme }) => theme.text.medium_22};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const ProjectContentName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: #d6deec;
`;

export const ProjectContents = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${(props) => (props.$isOpen ? '300px' : '0')};
  transition: max-height 0.3s ease-out;
`;
export const Position = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const Logout = styled.div`
  padding: 0 10.938% 15.313% 10.938%;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_18};
  gap: 10px;
  display: inline-flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 100px;
  cursor: pointer;
`;
