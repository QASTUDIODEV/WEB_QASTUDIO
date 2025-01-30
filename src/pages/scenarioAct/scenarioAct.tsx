import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useCharacterInfo from '@/hooks/scenarioAct/useCharacterInfo';
import useProjectInfo from '@/hooks/scenarioAct/useProjectInfo';

import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';
import { setCharacterId, setCharacterList, setProjectInfo, setScenarioList } from '@/slices/scenarioActSlice';

const dummyProjectInfo = {
  result: {
    projectId: 1,
    projectImage: 'https://via.placeholder.com/150',
    projectName: 'Dummy Project',
    projectUrl: 'https://dummyproject.com',
    introduction: 'This is a dummy project for testing purposes.',
    viewType: 'list',
    developmentSkill: 'React, TypeScript, Node.js',
    assistantId: 'assistant_001',
  },
};

const dummyCharacterList = {
  result: {
    length: 2,
    detailCharacters: [
      {
        characterId: 1,
        characterName: 'Character 1',
        author: 'Tester',
        createdAt: '2025-01-29T15:48:51.914Z',
        updatedAt: '2025-01-29T15:48:51.914Z',
      },
      {
        characterId: 2,
        characterName: 'Character 2',
        author: 'Tester',
        createdAt: '2025-01-29T15:48:51.914Z',
        updatedAt: '2025-01-29T15:48:51.914Z',
      },
    ],
  },
};

const dummyScenarioList = {
  result: {
    scenarioList: [
      {
        scenarioId: 101,
        scenarioName: 'Scenario 11',
        author: 'Tester',
        createdAt: '2025-01-29T15:48:51.914Z',
        updatedAt: '2025-01-29T15:48:51.914Z',
      },
      {
        scenarioId: 102,
        scenarioName: 'Scenario 22',
        author: 'Tester',
        createdAt: '2025-01-29T15:48:51.914Z',
        updatedAt: '2025-01-29T15:48:51.914Z',
      },
    ],
  },
};

export default function ScenarioActPage() {
  const dispatch = useDispatch();
  const { projectId: stringProjectId } = useParams<{ projectId: string }>();
  const projectId = stringProjectId ? Number(stringProjectId) : undefined;

  // 프로젝트 정보, 역할 리스트  가져오기
  const { useGetProjectInfo, useGetCharacterList } = useProjectInfo(projectId);
  const { data: projectInfo, isLoading: projectInfoLoading } = useGetProjectInfo;
  const { data: characterList, isLoading: characterListLoading } = useGetCharacterList;

  const selectedCharacterId = useSelector((state) => state.scenarioAct.characterId);

  // Redux 저장
  useEffect(() => {
    if (projectInfo?.result) {
      dispatch(setProjectInfo(projectInfo.result));
    }
    if (characterList?.result) {
      dispatch(setCharacterList(characterList.result));
    }
    // 첫 번째 역할 자동 선택
    dispatch(setCharacterId(characterList?.result?.detailCharacters[0]?.characterId || null));
  }, [projectInfo, characterList, selectedCharacterId, dispatch]);

  // 시나리오 리스트 가져오기
  const { useGetScenarioList } = useCharacterInfo(selectedCharacterId);
  const { data: scenarioList, isLoading: scenarioListLoading } = useGetScenarioList;

  // 시나리오 리스트 Redux 저장
  useEffect(() => {
    if (scenarioList?.result?.scenarioList) {
      dispatch(setScenarioList({ scenarioList: scenarioList.result.scenarioList }));
    }
  }, [scenarioList, dispatch]);

  if (projectInfoLoading || characterListLoading || scenarioListLoading) {
    return <div>로딩...</div>;
  }
  //test
  dispatch(setProjectInfo(dummyProjectInfo.result));
  dispatch(setCharacterList(dummyCharacterList.result));
  dispatch(setScenarioList(dummyScenarioList.result));
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
