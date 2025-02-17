import { useNavigate } from 'react-router-dom';

import * as S from '@/layouts/auth/auth.style.ts';

import { BackIcon } from '@/assets/icons';
import Ban from '@/assets/icons/ban.svg?react';
import { Button, Container, Header, TextWrapper } from '@/pages/noAuthority/noAuthority.style';

export default function NoAuthority() {
  const navigate = useNavigate();

  return (
    <Container>
      <TextWrapper>
        <div>
          <Header>
            <Ban className="ban" />
            <h1>You do not have access to this page.</h1>
          </Header>
          <p>You do not have access to this page, please try again in a moment.</p>
        </div>
        <Button onClick={() => navigate('/project', { replace: true })}>
          <BackIcon />
          <p>Go back to the main page</p>
        </Button>
      </TextWrapper>
      <S.Circle1 />
      <S.Circle2 />
      <S.Circle3 />
      <S.Circle4 />
    </Container>
  );
}
