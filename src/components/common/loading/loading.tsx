import Lottie from 'lottie-react';

import * as S from './loading.style';

import loadingLottie from '@/assets/lotties/Loading.json';

export default function Loading() {
  return (
    <S.Container>
      <Lottie animationData={loadingLottie} />
    </S.Container>
  );
}
