import * as S from './modalLoading.style';

import Spin from '@/assets/icons/spin.svg?react';

export default function ModalLoading() {
  return (
    <S.Container>
      <Spin className="spinner" />
    </S.Container>
  );
}
