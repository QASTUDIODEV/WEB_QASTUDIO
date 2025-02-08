import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TGetProjectInfo } from '@/types/projectInfo/projectInfo';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import Profile from '@/components/common/profile/profile';
import ProjectInput from '@/components/projectInfo/projectInput/projectInput';
import ProjectIntro from '@/components/projectInfo/projectIntroduction/projectIntro';
import ProjectSummary from '@/components/projectInfo/projectSummary/projectSummary';
import ToolTip from '@/components/projectInfo/toolTip/toolTip';

import Plus from '@/assets/icons/add.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Book from '@/assets/icons/book.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import Page from '@/assets/icons/page.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';
import { openModal } from '@/slices/modalSlice.ts';

export default function ProjectInfoPage({ projectInfo }: { projectInfo?: TGetProjectInfo }) {
  const result = projectInfo?.result;
  const { useGetProjectMember, useGetCharacter } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: members } = useGetProjectMember;
  const { data: characterList } = useGetCharacter;

  const modalDispatch = useDispatch();
  const character = characterList?.result.detailCharacters;
  const member = members?.result.members;
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const handleMouseEnter = (characterId: number) => {
    setActiveTooltip(characterId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${e.clientY + 15}px`; // 마우스 아래에 표시
      tooltipRef.current.style.left = `${e.clientX + 15}px`; // 마우스 오른쪽에 표시
    }
  };
  const navigate = useNavigate();
  return (
    <S.Container>
      <ProjectIntro result={result} />
      <S.Box height="6%">
        <ProjectInput result={result} />
      </S.Box>
      <S.SemiBox>
        <S.Left>
          <S.Box height="59%">
            <ProjectSummary result={result} />
          </S.Box>
          <S.Box height="35%">
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
                      <S.Medium18Text>{a.characterName}</S.Medium18Text>
                      <S.Medium14Text>{a.characterDescription}</S.Medium14Text>
                      <S.rowBox>
                        <Book />
                        <S.Medium18Text>{a.pageCnt}</S.Medium18Text>
                        <Page />
                        <S.Medium18Text>{a.scenarioCnt}</S.Medium18Text>
                      </S.rowBox>
                    </S.CharacterBox>
                  ))}
              </S.CharacterList>
              <S.CharacterAddBox
                onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.CharacterModal, modalProps: { projectId: Number(result?.projectId) } }))}
              >
                <Plus />
              </S.CharacterAddBox>
            </S.Character>
          </S.Box>
        </S.Left>
        <S.Right>
          <S.Box height="100%">
            <S.Title>Team Members</S.Title>
            <S.MemberContainer>
              {member?.map((a, i) => (
                <S.Member key={i} onClick={() => navigate(`/userInfo/${a.userId}`)}>
                  <S.MemberBox>
                    <S.ProfileWrapper>
                      <Profile profileImg={a.profileImage} />
                    </S.ProfileWrapper>
                    <S.MemberName>{a.nickname}</S.MemberName>
                    {a.projectRole === 'LEADER' && <Crown />}
                  </S.MemberBox>
                  <S.ArrowWrapper>
                    <ArrowRight />
                  </S.ArrowWrapper>
                </S.Member>
              ))}
            </S.MemberContainer>
            <S.Wrapper bottom="16px" right="24px">
              <Button
                type="normal"
                color="default"
                icon={<Plus />}
                iconPosition="left"
                onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.InviteModal, modalProps: { projectId: Number(result?.projectId) } }))}
              >
                Invite
              </Button>
            </S.Wrapper>
          </S.Box>
        </S.Right>
      </S.SemiBox>
    </S.Container>
  );
}
