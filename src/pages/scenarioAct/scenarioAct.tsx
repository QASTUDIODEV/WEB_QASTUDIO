import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from '@/hooks/common/useCustomRedux';
import useCharacterList from '@/hooks/scenarioAct/useGetCharacterList';
import useProjectInfo from '@/hooks/scenarioAct/useProjectInfo';

import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';
import { setCharacterList, setProjectInfo } from '@/slices/scenarioActSlice';

export default function ScenarioActPage() {
  const dispatch = useDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  // 프로젝트 정보 가져오기
  const { useGetProjectInfo } = useProjectInfo(projectId);
  const { data: projectInfo, isLoading: projectInfoLoading } = useGetProjectInfo;

  // 역할 리스트 가져오기
  const { useGetCharacterList } = useCharacterList(projectId);
  const { data: characterList, isLoading: characterListLoading } = useGetCharacterList;

  useEffect(() => {
    if (projectInfo?.result && characterList?.result) {
      dispatch(setProjectInfo(projectInfo.result));
      dispatch(setCharacterList(characterList.result));
    }
  }, [projectInfo, characterList, dispatch]);

  if (projectInfoLoading || characterListLoading) {
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
