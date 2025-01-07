import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SideBar = styled.div<{ hasScroll: boolean }>`
  width: 16.6667%;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(76.11deg, ${theme.colors.primary.pri_700} 0%, ${theme.colors.primary.pri_900} 100.13%)`};
  position: sticky;
  overflow-y: auto;
  top: 0;
  color: #d6deec;
  padding-bottom: ${(props) => (props.hasScroll ? '40px' : '0')};
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

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ProfileName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding-top: 7.5%;
  gap: 2.5%;
  cursor: pointer;
`;

export const SearchText = styled.input`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: #d6deec;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  padding: 2.5% 3.75%;
  &::placeholder {
    color: #d6deec;
  }
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

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const FooterPadding = styled.div`
  height: 40px;
  background: none;
`;
