import * as S from '@/components/projectInfo/toolTip/toolTip.style';

type TToltipProps = {
  name: string;
  description: string;
  scenario: string[] | undefined;
};
export default function ToolTip({ name, description, scenario }: TToltipProps) {
  return (
    <S.Container>
      <S.Text>{name}</S.Text>
      <S.Text>{description}</S.Text>
      <S.Text>/, /page, /roadmap</S.Text>
      <S.Text>{scenario?.join(', ')}</S.Text>
    </S.Container>
  );
}
