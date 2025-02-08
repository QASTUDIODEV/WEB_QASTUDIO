import * as S from '@/layouts/auth/auth.style.ts';

import { TextWrapper } from '@/pages/error/error.style';

export default function ErrorPage() {
  return (
    <S.Container>
      <TextWrapper>
        <h1>Not found page</h1>
        <p>The page could not be found, please try again in a moment.</p>
      </TextWrapper>
      <S.Circle1 />
      <S.Circle2 />
      <S.Circle3 />
      <S.Circle4 />
    </S.Container>
  );
}
