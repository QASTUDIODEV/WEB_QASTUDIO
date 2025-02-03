import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';
import useGetScenarioInfo from '@/hooks/scenario/useGetScenarioInfo';

import Loading from '@/components/common/loading/loading';
import ProjectTitle from '@/components/common/projectTitle/projectTitle';
import ButtonGroup from '@/components/scenario/buttonGroup/buttonGroup';
import CharacterList from '@/components/scenario/characterList/characterList';
import ScenarioModal from '@/components/scenario/scenarioModal/scenarioModal';

import ArrowLeft from '@/assets/icons/arrow_left_noColor.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_noColor.svg?react';
import * as S from '@/pages/scenario/scenario.style';
import { edit, newCharacter, resetChecks } from '@/slices/scenarioSlice';

export default function ScenarioPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const { isOpen } = useSelector((state) => state.modal);
  const { useGetProjectSummary, useGetCharacterList } = useGetScenarioInfo({ projectId: projectId || '', currentPage: currentPage });
  const { data: ProjectSummaryData } = useGetProjectSummary;
  const { data: CharacterListData, isPending } = useGetCharacterList;
  const CharacterData = CharacterListData?.result.characters;
  const characters = useSelector((state) => state.scenario.characters);

  useEffect(() => {
    dispatch(resetChecks());
    dispatch(edit(false));
  }, [navigate]);

  useEffect(() => {
    if (CharacterListData) {
      CharacterData?.forEach((character) => {
        const exists = characters.some((char) => char.id === character.characterId);
        if (!exists) {
          const characterData = {
            isChecked: false,
            isSelected: false,
            scenarios: character.scenarios,
            id: character.characterId,
          };
          dispatch(newCharacter(characterData));
        }
      });
    }
  }, [CharacterListData, CharacterData, currentPage, dispatch]);

  const goToNextPage = () => {
    if (!CharacterListData?.result.isLast) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!CharacterListData?.result.isFirst) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isPending) {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
  }

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

        <ButtonGroup projectId={projectId || ''} />

        <S.CharactersContainer>
          {CharacterListData?.result.characters.map((character) => (
            <CharacterList key={character.characterId} character={character} setSelectedIdx={setSelectedIdx} selectedIdx={selectedIdx} />
          ))}
        </S.CharactersContainer>
      </S.Container>

      <S.Pagination>
        {!CharacterListData?.result.isFirst ? (
          <S.IconContainer onClick={goToPreviousPage}>
            <ArrowLeft stroke={'#DFE8F9'} />
          </S.IconContainer>
        ) : (
          <S.IconContainer onClick={goToPreviousPage}>
            <ArrowLeft stroke={'#e9e8f91a'} />
          </S.IconContainer>
        )}

        {CharacterListData?.result &&
          (() => {
            const totalPages = CharacterListData.result.totalPage;
            const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 5));
            const endPage = Math.min(totalPages - 1, startPage + 4);

            return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
              const pageIndex = startPage + index;
              return (
                <S.PageNumber key={pageIndex} $isActive={currentPage === pageIndex} onClick={() => setCurrentPage(pageIndex)}>
                  {pageIndex + 1}
                </S.PageNumber>
              );
            });
          })()}

        {!CharacterListData?.result.isLast ? (
          <S.IconContainer onClick={goToNextPage}>
            <ArrowRight stroke={'#DFE8F9'} />
          </S.IconContainer>
        ) : (
          <S.IconContainer onClick={goToNextPage}>
            <ArrowRight stroke={'#e9e8f91a'} />
          </S.IconContainer>
        )}
      </S.Pagination>
    </S.Background>
  );
}
