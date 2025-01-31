import * as S from '@/components/projectInfo/toolTip/toolTip.style';

type TToltipProps = {
  data: {
    characterId: number;
    characterName: string;
    characterDescription: string;
    pageCnt: number;
    scenarioCnt: number;
    accessPageList: string[];
    scenarioList: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
export default function ToolTip({ data }: TToltipProps) {
  return (
    <S.Container>
      <S.Text>{data.characterName}</S.Text>
      <S.Text>{data.characterDescription}</S.Text>
      <S.Text>{data.accessPageList.join(', ')}</S.Text>
      <S.Text>{data.scenarioList.join(', ')}</S.Text>
    </S.Container>
  );
}
