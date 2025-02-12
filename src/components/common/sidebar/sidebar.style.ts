import styled from 'styled-components';

import { media } from '@/styles/media';

export const SideBar = styled.div`
  min-width: 256px;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(76.11deg, ${theme.colors.primary.pri_700} 0%, ${theme.colors.primary.pri_900} 100.13%)`};
  position: sticky;
  top: 0;
  color: #d6deec;
  scrollbar-width: none;
  ${media.desktop`
    position: fixed;
    z-index: 800;
    min-width: 96px;
    max-width: 96px;
    transition: .6s;
    &:hover {
      min-width: 320px;
      .menu {
        display: flex;
      }
      .show.project {
        margin-bottom: 0;
      }
      .show.content {
        margin-bottom: 0;
      }
    }
    .menu {
      display: none;
    }
    .show {
      min-width: 40px;
      max-width: 40px;
      min-height: 40px;
      max-height: 40px;
    }
    .show.project {
      margin-bottom: 80px;
    }
    .show.content {
      margin-bottom: 40px;
    }
  `}
`;
export const Logout = styled.button`
  width: fit-content;
  padding: 0 10.938% 15.313% 10.938%;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-size: 14.4px;
  font-weight: 500;
  line-height: 21.6px;
  letter-spacing: 0.02em;
  text-align: left;
  gap: 10px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
`;
export const ProjectBox = styled.div`
  height: 100%;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${media.desktop`
    display: flex;
    flex-direction: column;
    align-items: center;
  
  ${SideBar}:hover &{
    display: flex;
    align-items: stretch;
  }
  `}
`;
export const LogoutBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  ${media.desktop`
    height: 100%;
    align-items: center;
    &:hover{
      align-items: stretch;
    }
  `}
`;
