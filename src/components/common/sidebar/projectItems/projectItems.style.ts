import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { SideBar } from '../sidebar.style';

import { media } from '@/styles/media';

export const ProjectList = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
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
  ${media.desktop`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${SideBar}:hover &{
    display: flex;
    flex-direction: row;
  }
  `}
`;
export const ProjectProfile = styled.div`
  width: 19.2px;
  height: 19.2px;
`;
export const ProjectName = styled.p`
  margin: 0;
  font-size: 14.4px;
  font-weight: 500;
  line-height: 21.6px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #d6deec;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
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
export const ProjectContent = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 2.5%;
  padding: 4.602% 0% 4.602% 15.625%;
  background: ${({ $isActive }) => ($isActive ? 'rgba(223, 232, 249, 0.1)' : 'transparent')};
`;
export const ProjectContentName = styled.p`
  margin: 0;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
  color: #d6deec;
`;
