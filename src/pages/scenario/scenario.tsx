import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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
import { newCharacter, resetCharacters } from '@/slices/scenarioSlice';

export default function ScenarioPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const { isOpen } = useSelector((state) => state.modal);
  const { useGetProjectSummary, useGetCharacterList } = useGetScenarioInfo({ projectId: projectId || '', currentPage: currentPage });
  const { data: ProjectSummaryData } = useGetProjectSummary;
  const { data: CharacterListData, isPending } = useGetCharacterList;
  const CharacterData = CharacterListData?.result.characters;
  const characters = useSelector((state) => state.scenario.characters);

  // play 버튼을 누르고 뒤로가기를 눌러 돌아오면 아무것도 안보이는 상황 방지하기 위함
  useEffect(() => {
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    dispatch(resetCharacters());
    if (CharacterListData) {
      CharacterData?.forEach((character) => {
        const exists = characters.some((char) => char.id === character.characterId);
        if (!exists) {
          const characterData = {
            title: character.characterName,
            isChecked: false,
            isSelected: false,
            createdBy: character.author,
            isExpanded: false,
            scenarios: character.scenarios,
            id: character.characterId,
            name: character.characterName,
            createdAt: character.createdAt,
          };
          dispatch(newCharacter(characterData));
        }
      });
    }
  }, [CharacterListData, currentPage, dispatch]);

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
          <CharacterList />
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
          Array.from({ length: CharacterListData.result.totalPage }, (_, index) => (
            <S.PageNumber key={index} isActive={currentPage === index} onClick={() => setCurrentPage(index)}>
              {index + 1}
            </S.PageNumber>
          ))}
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
