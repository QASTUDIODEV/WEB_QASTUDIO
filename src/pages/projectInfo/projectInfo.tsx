import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import type { TGetProjectInfo } from '@/types/projectInfo/projectInfo';
import { DEVICE, STACK } from '@/enums/enums';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import Profile from '@/components/common/profile/profile';
import ProjectTitle from '@/components/common/projectTitle/projectTitle';
import ToolTip from '@/components/projectInfo/toolTip/toolTip';

import Plus from '@/assets/icons/add.svg?react';
import Goto from '@/assets/icons/arrow_goto.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Book from '@/assets/icons/book.svg?react';
import Branch from '@/assets/icons/branch_white.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import File from '@/assets/icons/files.svg?react';
import Page from '@/assets/icons/page.svg?react';
import Rights from '@/assets/icons/shield.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';
import ProjectStructure from '@/pages/projectInfo/projectStructure';
import { openModal } from '@/slices/modalSlice.ts';

export default function ProjectInfoPage({ projectInfo }: { projectInfo?: TGetProjectInfo }) {
  const queryClient = useQueryClient();
  const result = projectInfo?.result;
  const [isStructureVisible, setIsStructureVisible] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(result?.introduction || '');
  const [preContent, setPreContent] = useState(result?.introduction || '');
  const { useEditIntroduce, useGetProjectMember, useGetPageSummary, useGetCharacter } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: members } = useGetProjectMember;
  const { data: summaryList } = useGetPageSummary;
  const { data: characterList } = useGetCharacter;
  const summary = summaryList?.result.pageSummaryList;

  const { mutate: editIntroduce } = useEditIntroduce;
  const modalDispatch = useDispatch();
  const character = characterList?.result.detailCharacters;
  const member = members?.result.members;
  const accessed = summary?.map((a) => a.hasAccess);
  const notAccessed = summary?.map((a) => a.deniedAccess);
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
  const type = DEVICE[result?.viewType as keyof typeof DEVICE] ?? DEVICE.PC;
  const stack = STACK[result?.developmentSkill as keyof typeof STACK] ?? STACK.NEXT;
  const handleEdit = () => {
    const maxRows = 2;
    const lines = preContent.split('\n');
    const modifiedText = lines.slice(0, maxRows).join('\n');
    setContent(modifiedText);
    setIsEdit(false);
    editIntroduce(
      {
        projectId: Number(result?.projectId),
        introduce: preContent,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectInfo', Number(result?.projectId)] });
        },
      },
    );
  };
  useEffect(() => {
    setPreContent(result?.introduction || '');
    setContent(result?.introduction || '');
  }, [result?.projectId]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxRows = 2;
    const textarea = e.target;

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight, 10);
    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);
    if (currentRows > maxRows) {
      return;
    }
    setPreContent(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Profile>
        <ProjectTitle title={result?.projectName} profileImg={result?.projectImage} stack={stack} device={type} />
        <S.Wrapper top="7.2px" right="0" className="buttonShow">
          <Button
            type="normal"
            color="default"
            icon={<Goto />}
            iconPosition="right"
            onClick={() => {
              if (result?.projectUrl) {
                window.location.href = result.projectUrl;
              }
            }}
          >
            Go to Site
          </Button>
        </S.Wrapper>
      </S.Profile>
      <S.Box height="6%">
        <S.Title>Introduction to the Project</S.Title>
        {!isEdit ? (
          <>
            <S.Text>{content}</S.Text>
            <S.Wrapper bottom="16px" right="24px">
              <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            </S.Wrapper>
          </>
        ) : (
          <>
            <S.Input onChange={(e) => handleInputChange(e)} value={preContent} rows={2} />
            <S.Wrapper bottom="16px" right="24px">
              <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={handleEdit}>
                Done
              </Button>
            </S.Wrapper>
          </>
        )}
      </S.Box>
      <S.SemiBox>
        <S.Left>
          <S.Box
            height="59%"
            style={{
              cursor: 'pointer',
            }}
          >
            {isStructureVisible ? (
              <>
                <S.Title>Project structure</S.Title>
                <S.TextBold>Summary</S.TextBold>
                <S.TextLight>{content}</S.TextLight>
                <S.Wrapper top="16px" right="24px">
                  <Plus
                    onClick={() =>
                      modalDispatch(
                        openModal({ modalType: MODAL_TYPES.CreatePageModal, modalProps: { projectId: Number(result?.projectId), character: character } }),
                      )
                    }
                  />
                </S.Wrapper>
                <S.InnerBox>
                  <div style={{ flex: 1 }}>
                    <S.Table>
                      <thead>
                        <tr>
                          <S.TH>
                            <File /> Page
                          </S.TH>
                          <S.TH>
                            <Branch /> Path
                          </S.TH>
                          <S.TH>
                            <Rights /> Access Rights
                          </S.TH>
                        </tr>
                      </thead>
                      <tbody>
                        {summary &&
                          summary.map((a, index) => (
                            <S.TR
                              key={a.pageId}
                              onClick={() => {
                                setIsStructureVisible(false);
                                setSelectedPage(index);
                              }}
                            >
                              <S.TD>{a.pageName}</S.TD>
                              <S.TD>{a.path}</S.TD>
                              <S.TD>
                                <S.AccessRights>
                                  <S.Button>
                                    <Button type="small_round" color="green">
                                      접근 가능
                                    </Button>
                                  </S.Button>
                                  {accessed &&
                                    accessed[index].map((role, i) => (
                                      <S.Button key={i}>
                                        <Button type="small_round" color="white_round">
                                          {role}
                                        </Button>
                                      </S.Button>
                                    ))}

                                  <S.Button>
                                    <Button type="small_round" color="red">
                                      접근 불가능
                                    </Button>
                                  </S.Button>
                                  {notAccessed &&
                                    notAccessed[index].map((role, i) => (
                                      <S.Button key={i}>
                                        <Button type="small_round" color="white_round">
                                          {role}
                                        </Button>
                                      </S.Button>
                                    ))}
                                </S.AccessRights>
                              </S.TD>
                            </S.TR>
                          ))}
                      </tbody>
                    </S.Table>
                  </div>
                </S.InnerBox>
              </>
            ) : (
              <ProjectStructure
                selectedPage={selectedPage}
                setSelectedPage={(page) => setSelectedPage(page)}
                onBackToSummary={() => setIsStructureVisible(true)}
                pageData={summary}
                projectId={Number(result?.projectId)}
                character={character}
              />
            )}
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
