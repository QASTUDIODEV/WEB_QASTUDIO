import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TInfoDTO } from '@/types/projectInfo/projectInfo';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import * as S from '@/components/projectInfo/characterBox/characterBox.style';
import ToolTip from '@/components/projectInfo/toolTip/toolTip';

import Plus from '@/assets/icons/add.svg?react';
import Book from '@/assets/icons/book.svg?react';
import Page from '@/assets/icons/page.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function CharacterBox({ result }: TInfoDTO) {
  const modalDispatch = useDispatch();
  const navigate = useNavigate();
  const { useGetCharacter } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: characterList } = useGetCharacter;
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const character = characterList?.result.detailCharacters;
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (characterId: number) => {
    setActiveTooltip(characterId);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${e.clientY + 15}px`;
      tooltipRef.current.style.left = `${e.clientX + 15}px`;
    }
  };
  return (
    <S.Container onClick={() => navigate(`/project/scenario/${result?.projectId}`)}>
      <S.Title>Character</S.Title>
      <S.Character>
        <S.CharacterList>
          {character &&
            character.map((a) => (
              <S.CharacterBox
                key={a.characterId}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseEnter(a.characterId)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {activeTooltip === a.characterId && (
                  <S.TooltipWrapper ref={tooltipRef} visible={true}>
                    <ToolTip data={a} />
                  </S.TooltipWrapper>
                )}
                <S.CharacterName>{a.characterName}</S.CharacterName>
                <S.ChDescript>{a.characterDescription}</S.ChDescript>
                <S.rowBox>
                  <Book />
                  <S.CharacterName>{a.pageCnt}</S.CharacterName>
                  <Page />
                  <S.ChDescript>{a.scenarioCnt}</S.ChDescript>
                </S.rowBox>
              </S.CharacterBox>
            ))}
        </S.CharacterList>
        <S.CharacterAddBox
          onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.ScenarioModal, modalProps: { projectId: result?.projectId, currentPage: 0 } }))}
        >
          <Plus />
        </S.CharacterAddBox>
      </S.Character>
    </S.Container>
  );
}
