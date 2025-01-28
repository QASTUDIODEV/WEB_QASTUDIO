import * as S from '@/components/scenarioAct/header/header.style';

interface IHeaderProps {
  textURL: string;
}
export default function Header({ textURL }: IHeaderProps) {
  return (
    <S.Container>
      <p>{textURL}</p>
    </S.Container>
  );
}
