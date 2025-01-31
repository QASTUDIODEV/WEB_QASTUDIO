import * as S from '@/components/projectInfo/toolTip/toolTip.style';

type TToltipProps = {
  name: string;
  description: string;
};
export default function ToolTip({ name, description }: TToltipProps) {
  return (
    <S.Container>
      <S.Text>{name}</S.Text>
      <S.Text>{description}</S.Text>
      <S.Text>/, /page, /roadmap</S.Text>
      <S.Text>시나리오1, 시나리오2, 시나리오3</S.Text>
    </S.Container>
  );
}
