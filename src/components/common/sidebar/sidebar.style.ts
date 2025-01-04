import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideBar = styled.div`
  width: 320px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary.pri_800};
  position: sticky;
  top: 0;
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-left: 40px;
`;

const Profile = styled.div`
  margin-top: 30px;
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ProfileName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_24};
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  gap: 8px;
  cursor: pointer;
`;

const SearchText = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const SearchInput = styled.input`
  margin: 12px 0;
  width: 240px;
  height: 47px;
  padding: 14px 17px;
  border-radius: 8.57px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  background: none;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_200};
  }
`;

const Projects = styled.div`
  margin-top: 32px;
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const ProjectText = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_24};
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 40px;
  gap: 8px;
  cursor: pointer;
`;

const ProjectName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const ProjectContent = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 40px 12px 60px;
  background: ${({ $isActive }) => ($isActive ? '#424854CC' : 'transparent')};
`;

const ProjectContentName = styled.p`
  margin: 0;
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.gray.gray_50};
`;

const ProjectContents = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${(props) => (props.$isOpen ? '300px' : '0')};
  transition: max-height 0.3s ease-out;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export {
  Container,
  Profile,
  ProfileImg,
  ProfileName,
  Project,
  ProjectContent,
  ProjectContentName,
  ProjectContents,
  ProjectName,
  Projects,
  ProjectText,
  Search,
  SearchInput,
  SearchText,
  SideBar,
  StyledNavLink,
};
