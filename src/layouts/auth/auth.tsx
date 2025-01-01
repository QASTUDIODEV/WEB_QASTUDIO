import { Outlet } from 'react-router-dom';

import * as S from '@/layouts/auth/auth.style.ts';

export default function AuthLayout() {
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
}
