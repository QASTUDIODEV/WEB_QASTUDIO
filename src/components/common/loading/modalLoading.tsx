import * as S from './loadingSpinner.style';

import Spin from '@/assets/icons/spin.svg?react';

export default function LoadingSpinner() {
  return (
    <S.Container>
      <Spin className="spinner" />
    </S.Container>
  );
}
