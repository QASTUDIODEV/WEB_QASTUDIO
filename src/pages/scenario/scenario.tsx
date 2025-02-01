import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';
import useGetScenarioInfo from '@/hooks/scenario/useGetScenarioInfo';

import ProjectTitle from '@/components/common/projectTitle/projectTitle';
import ButtonGroup from '@/components/scenario/buttonGroup/buttonGroup';
import CharacterList from '@/components/scenario/characterList/characterList';
import ScenarioModal from '@/components/scenario/scenarioModal/scenarioModal';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import * as S from '@/pages/scenario/scenario.style';
import { newCharacter } from '@/slices/scenarioSlice';

export default function ScenarioPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen } = useSelector((state) => state.modal);
  const { useGetProjectSummary, useGetCharacterList } = useGetScenarioInfo({ projectId: projectId || '', currentPage: currentPage });
  const { data: ProjectSummaryData } = useGetProjectSummary;
  const { data: CharacterListData } = useGetCharacterList;
  const CharacterData = CharacterListData?.result.detailCharacters;

  useEffect(() => {
    CharacterData?.map((character) => {
      const characterData = {
        title: character.characterName,
        isChecked: false,
        isSelected: false,
        createdBy: character.author,
        isExpanded: false,
        scenarios: character.scenarioList,
        id: character.characterId,
        name: character.characterName,
        createdAt: character.createdAt,
      };
      dispatch(newCharacter(characterData));
    });
  }, [CharacterData]);

  const goToNextPage = () => {
    if (!CharacterListData?.result.isLast) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!CharacterListData?.result.isLast) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <S.Background>
      {isOpen && <ScenarioModal projectId={projectId || ''} />}
      <S.Container>
        <S.Header>
          <ProjectTitle
            profileImg={ProjectSummaryData?.result.projectImage}
            title={ProjectSummaryData?.result.projectName}
            device={ProjectSummaryData?.result.viewType}
            stack={ProjectSummaryData?.result.developmentSkill}
          />
        </S.Header>

        <ButtonGroup />

        <S.CharactersContainer>
          <CharacterList />
        </S.CharactersContainer>
      </S.Container>

      <S.Pagination>
        <S.IconContainer onClick={() => goToPreviousPage}>
          <ArrowLeft />
        </S.IconContainer>
        <S.PageNumber>1</S.PageNumber>
        <S.IconContainer onClick={() => goToNextPage}>
          <ArrowRight />
        </S.IconContainer>
      </S.Pagination>
    </S.Background>
  );
}
