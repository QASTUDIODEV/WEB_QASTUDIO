import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/common/sidebar/sidebar';

import * as S from '@/layouts/main/mainLayout.style';

export default function MainLayout() {
  return (
    <S.Container>
      <Sidebar />
      <Outlet />
    </S.Container>
  );
}
