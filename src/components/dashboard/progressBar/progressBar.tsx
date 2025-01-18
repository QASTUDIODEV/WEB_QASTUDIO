import * as S from './progressBar.style';

type TProgressBarProps = {
  percent: number;
};

export default function ProgressBar({ percent }: TProgressBarProps) {
  return (
    <S.Container>
      <S.Filler $percent={percent} />
      <S.PercentageText>{`${percent}%`}</S.PercentageText>
    </S.Container>
  );
}
