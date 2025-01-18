import * as S from './percentLabel.style';

import ArrowDown from '@/assets/icons/Line_arrow_down.svg?react';
import ArrowUp from '@/assets/icons/Line_arrow_up.svg?react';

type TPercentLabelProps = {
  percent: number;
  increase: boolean;
};

export default function PercentLabel({ percent, increase }: TPercentLabelProps) {
  return (
    <S.Container $increase={increase}>
      <p>{percent} %</p>
      {increase ? <ArrowUp /> : <ArrowDown />}
    </S.Container>
  );
}
