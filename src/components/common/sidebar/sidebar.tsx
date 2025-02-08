import { useRef } from 'react';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import * as S from '@/components/common/sidebar/sidebar.style';

import SideBarProfile from './profile/sideBarProfile';
import ProjectList from './projectList/projectList';

import Out from '@/assets/icons/logout.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function Sidebar() {
  const modalDispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  return (
    <S.SideBar ref={sidebarRef}>
      <S.LogoutBox>
        <S.ProjectBox>
          <SideBarProfile />
          <ProjectList />
        </S.ProjectBox>
        <S.Logout onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.LogoutModal }))}>
          <p className="menu">Logout</p>
          <Out />
        </S.Logout>
      </S.LogoutBox>
    </S.SideBar>
  );
}
