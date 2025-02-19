import type { TGetProjectInfo } from '@/types/projectInfo/projectInfo';

import CharacterBox from '@/components/projectInfo/characterBox/characterBox';
import ProjectInput from '@/components/projectInfo/projectInput/projectInput';
import ProjectSummary from '@/components/projectInfo/projectSummary/projectSummary';
import TeamMember from '@/components/projectInfo/teamMember/teamMember';

import * as S from '@/pages/projectInfo/projectInfo.style';

export default function ProjectInfoPage({ projectInfo }: { projectInfo?: TGetProjectInfo }) {
  const result = projectInfo?.result;
  return (
    <S.Container>
      <S.Box height="6%">
        <ProjectInput result={result} />
      </S.Box>
      <S.SemiBox>
        <S.Left>
          <S.Box height="59%">
            <ProjectSummary result={result} />
          </S.Box>
          <S.CharacterBox height="35%">
            <CharacterBox result={result} />
          </S.CharacterBox>
        </S.Left>
        <S.Right>
          <S.Box height="100%">
            <TeamMember result={result} />
          </S.Box>
        </S.Right>
      </S.SemiBox>
    </S.Container>
  );
}
