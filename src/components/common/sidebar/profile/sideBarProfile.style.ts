import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { SideBar } from '../sidebar.style';

import { media } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 10.938% 0 10.938%;
  ${media.desktop`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${SideBar}:hover & {
      display: flex;
      align-items: stretch;
    }
  `}
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;
export const Profile = styled.div`
  padding-top: 50px;
  display: flex;
  align-items: center;
  gap: 2.5%;
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
export const ProfileWrapper = styled.div`
  width: 32px;
  height: 32px;
`;
export const ProfileName = styled.p`
  margin: 0;
  font-size: 19.2px;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #d6deec;
`;
