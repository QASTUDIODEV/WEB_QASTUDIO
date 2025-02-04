import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useProjectInfo from '@/hooks/scenarioAct/useProjectInfo';
import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import Loading from '@/components/common/loading/loading';
import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';
import { setScenarioList } from '@/slices/scenarioActSlice';

export default function ScenarioActPage() {
  const { projectId: stringProjectId } = useParams<{ projectId: string }>();
  const projectId = stringProjectId ? Number(stringProjectId) : undefined;
  const selectedCharacterId = useSelector((state) => state.scenarioAct.characterId);

  const { useGetProjectInfo, useGetCharacterList } = useProjectInfo(projectId);
  const { isLoading: projectInfoLoading } = useGetProjectInfo;
  const { isLoading: characterListLoading } = useGetCharacterList;

  const { useGetScenarioList } = useScenarioList(selectedCharacterId);
  const { isLoading: scenarioListLoading } = useGetScenarioList;

  // Redux Store 업데이트
  const dispatch = useDispatch();
  useEffect(() => {
    if (useGetScenarioList.data?.result?.scenarios) {
      dispatch(setScenarioList(useGetScenarioList.data.result));
    }
  }, [useGetScenarioList.data, dispatch]);

  if (projectInfoLoading || characterListLoading || scenarioListLoading) {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
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
