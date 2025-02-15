import { Outlet } from 'react-router-dom';

import ProjectHeader from '@/components/common/projectHeader/projectHeader';
import Sidebar from '@/components/common/sidebar/sidebar';

import * as S from '@/layouts/main/mainLayout.style';

export default function MainLayout() {
  return (
    <S.Container>
      <Sidebar />
      <S.OutletWrapper>
        <ProjectHeader />
        <Outlet />
      </S.OutletWrapper>
    </S.Container>
  );
}
