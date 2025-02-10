import { useState } from 'react';

import type { TInfoDTO } from '@/types/projectInfo/projectInfo';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import ProjectStructure from '@/components/projectInfo/projectStructure/projectStructure';
import * as S from '@/components/projectInfo/projectSummary/projectSumary.style';

import Plus from '@/assets/icons/add.svg?react';
import Branch from '@/assets/icons/branch_white.svg?react';
import File from '@/assets/icons/files.svg?react';
import Rights from '@/assets/icons/shield.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function ProjectInfoPage({ result }: TInfoDTO) {
  const modalDispatch = useDispatch();
  const [isStructureVisible, setIsStructureVisible] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0);
  const { useGetPageSummary, useGetCharacter } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: summaryList } = useGetPageSummary;
  const { data: characterList } = useGetCharacter;
  const summary = summaryList?.result.pageSummaryList;
  const character = characterList?.result.detailCharacters;
  const accessed = summary?.map((a) => a.hasAccess);
  const notAccessed = summary?.map((a) => a.deniedAccess);
  return (
    <>
      {isStructureVisible ? (
        <>
          <S.Title>Project structure</S.Title>
          <S.TextBold>Summary</S.TextBold>
          <S.TextLight>{result?.introduction}</S.TextLight>
          <S.Wrapper>
            <Plus
              onClick={() =>
                modalDispatch(openModal({ modalType: MODAL_TYPES.CreatePageModal, modalProps: { projectId: result?.projectId, character: character } }))
              }
              style={{ cursor: 'pointer' }}
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
    </>
  );
}
