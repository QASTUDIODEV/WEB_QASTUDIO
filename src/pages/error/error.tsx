import { useNavigate } from 'react-router-dom';

import * as S from '@/layouts/auth/auth.style.ts';

import { BackIcon } from '@/assets/icons';
import { Button, TextWrapper } from '@/pages/error/error.style';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <TextWrapper>
        <div>
          <h1>Not found page</h1>
          <p>The page could not be found, please try again in a moment.</p>
        </div>
        <Button onClick={() => navigate('/', { replace: true })}>
          <BackIcon />
          <p>Go back to the main page</p>
        </Button>
      </TextWrapper>
      <S.Circle1 />
      <S.Circle2 />
      <S.Circle3 />
      <S.Circle4 />
    </S.Container>
  );
}
