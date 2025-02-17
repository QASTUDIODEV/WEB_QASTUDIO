import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getPageNumbers } from '@/utils/getPageNumbers';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';
import useGetScenarioInfo from '@/hooks/scenario/useGetScenarioInfo';

import ButtonGroup from '@/components/scenario/buttonGroup/buttonGroup';
import CharacterList from '@/components/scenario/characterList/characterList';

import ArrowLeft from '@/assets/icons/arrow_left_noColor.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_noColor.svg?react';
import * as S from '@/pages/scenario/scenario.style';
import { deleteAllCharacter, edit, newCharacter, resetChecks } from '@/slices/scenarioSlice';

export default function ScenarioPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();
  const { isEdit } = useSelector((state) => state.scenario);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState({
    isCharacter: true,
    idx: -1,
  });

  const { useGetCharacterList } = useGetScenarioInfo({ projectId: projectId || '', currentPage: currentPage });
  const { data: CharacterListData, isPending, error } = useGetCharacterList;

  const CharacterData = CharacterListData?.result.characters;

  useEffect(() => {
    setCurrentPage(0);
  }, [projectId]);

  useEffect(() => {
    dispatch(resetChecks());
    dispatch(edit(false));
  }, [navigate]);

  useEffect(() => {
    if (CharacterListData) {
      dispatch(deleteAllCharacter());
      CharacterData?.forEach((character) => {
        const characterData = {
          isChecked: false,
          isSelected: false,
          scenarios: character.scenarios,
          id: character.characterId,
        };
        dispatch(newCharacter(characterData));
      });
    }
  }, [CharacterData, currentPage, dispatch, isEdit]);

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
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <S.Background>
      <S.Container>
        <ButtonGroup projectId={projectId || ''} currentPage={currentPage} />
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
          getPageNumbers({ totalPages: CharacterListData.result.totalPage, currentPage }).map((pageIndex) => (
            <S.PageNumber key={pageIndex} $isActive={currentPage === pageIndex} onClick={() => setCurrentPage(pageIndex)}>
              {pageIndex + 1}
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
