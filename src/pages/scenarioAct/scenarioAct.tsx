import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks/common/useCustomRedux';
import useProjectInfo from '@/hooks/scenarioAct/useProjectInfo';
import useCharacterInfo from '@/hooks/scenarioAct/useScenarioList';

import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';

export default function ScenarioActPage() {
  const { projectId: stringProjectId } = useParams<{ projectId: string }>();
  const projectId = stringProjectId ? Number(stringProjectId) : undefined;
  const selectedCharacterId = useSelector((state) => state.scenarioAct.characterId);

  const { useGetProjectInfo, useGetCharacterList } = useProjectInfo(projectId);
  const { isLoading: projectInfoLoading } = useGetProjectInfo;
  const { isLoading: characterListLoading } = useGetCharacterList;

  const { useGetScenarioList } = useCharacterInfo(selectedCharacterId);
  const { isLoading: scenarioListLoading } = useGetScenarioList;

  if (projectInfoLoading || characterListLoading || scenarioListLoading) {
    return <div>로딩...</div>;
  }

  return (
    <S.Container>
      <S.Header>
        <Header />
      </S.Header>

      <S.Controller>
        <Controller />
      </S.Controller>

      <S.ActSection>
        <ActSection />
      </S.ActSection>
    </S.Container>
  );
}
