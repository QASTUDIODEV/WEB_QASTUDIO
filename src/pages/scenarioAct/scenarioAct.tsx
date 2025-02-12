import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useFetchPageSource from '@/hooks/scenarioAct/useFetchPageSource';
import useProjectInfo from '@/hooks/scenarioAct/useProjectInfo';
import useScenarioList from '@/hooks/scenarioAct/useScenarioList';

import Loading from '@/components/common/loading/loading';
import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';
import { setCharacterId, setScenarioList, updateIframeContent } from '@/slices/scenarioActSlice';

export default function ScenarioActPage() {
  const dispatch = useDispatch();
  const { projectId: stringProjectId } = useParams<{ projectId: string }>();
  const projectId = stringProjectId ? Number(stringProjectId) : undefined;
  const selectedCharacterId = useSelector((state) => state.scenarioAct.characterId);

  const { useGetProjectInfo, useGetCharacterList } = useProjectInfo(projectId);
  const { isLoading: projectInfoLoading } = useGetProjectInfo;
  const { isLoading: characterListLoading } = useGetCharacterList;

  // 케릭터 id선택시 에러나는 이유
  const { useGetScenarioList } = useScenarioList(selectedCharacterId);
  const { isLoading: scenarioListLoading } = useGetScenarioList;
  // 시나리오 리스트는 refetch할 때 선언되서 useEffect 분리
  useEffect(() => {
    if (useGetScenarioList.data?.result?.scenarios) {
      dispatch(setScenarioList(useGetScenarioList.data.result));
    }
  }, [useGetScenarioList.data, dispatch]);

  const { useFetchInitialPage } = useFetchPageSource();
  const { mutate: fetchPageSource, isPending } = useFetchInitialPage;
  useEffect(() => {
    fetchPageSource(
      { targetUrl: 'https://example.com' },
      {
        onSuccess: (data) => {
          console.log(data);
          dispatch(updateIframeContent({ html: data.result.html, css: data.result.css }));
        },
      },
    );
  }, [fetchPageSource, dispatch]);

  if (projectInfoLoading || characterListLoading || scenarioListLoading || isPending) {
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
