import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import * as S from '@/components/projectInfo/projectStructure/projectStructure.style';

import Plus from '@/assets/icons/add.svg?react';
import Branch from '@/assets/icons/branch.svg?react';
import FileBranch from '@/assets/icons/file_branch.svg?react';
import Rights from '@/assets/icons/rights.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

type TProjectStructureProps = {
  selectedPage: number;
  setSelectedPage: (page: number) => void;
  onBackToSummary: () => void;
  pageData:
    | {
        pageId: number;
        pageName: string;
        pageDescription: string;
        path: string;
        hasAccess: string[];
        deniedAccess: string[];
        scenarios: string[];
      }[]
    | undefined;
  projectId: number;
  character:
    | {
        characterId: number;
        characterName: string;
        characterDescription: string;
        pageCnt: number;
        scenarioCnt: number;
        accessPageList: string[];
        scenarioList: string[];
        author: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
};

function ProjectStructure({ selectedPage, setSelectedPage, onBackToSummary, pageData, projectId, character }: TProjectStructureProps) {
  const modalDispatch = useDispatch();
  return (
    <>
      <S.Title>Project structure</S.Title>
      <S.TitleBox>
        <S.Wrap>
          <S.TextBold>{pageData && pageData[selectedPage].pageName}</S.TextBold>
          {pageData && (
            <>
              <Branch />
              <S.Path>{pageData[selectedPage].path}</S.Path>
            </>
          )}
        </S.Wrap>
        <S.ButtonWrapper>
          <S.ButtonItem>
            <Button
              type="small_square"
              color="white_square"
              onClick={() => {
                onBackToSummary();
              }}
            >
              전체
            </Button>
          </S.ButtonItem>
          {pageData?.map((p, i) => (
            <S.ButtonItem key={i}>
              <Button
                type="small_square"
                color={selectedPage === i ? 'selected' : 'white_square'}
                key={p.pageId}
                onClick={() => {
                  setSelectedPage(i);
                }}
              >
                {p.pageName}
              </Button>
            </S.ButtonItem>
          ))}
        </S.ButtonWrapper>
      </S.TitleBox>
      {pageData && <S.TextLight>{pageData[selectedPage].pageDescription}</S.TextLight>}
      <S.Wrapper top="16px" right="24px">
        <Plus
          onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.CreatePageModal, modalProps: { projectId: projectId, character: character } }))}
          style={{ cursor: 'pointer' }}
        />
      </S.Wrapper>
      <S.InnerBox>
        <S.LRBox width="41.66666667%">
          <S.Wrap>
            <Rights width={19.2} height={19.2} />
            <S.InnerBoxTitle>Access rights</S.InnerBoxTitle>
          </S.Wrap>
          <S.AccessBox>
            {pageData && pageData[selectedPage].hasAccess && (
              <S.AccessRights>
                <Button type="small_round" color="green">
                  접근 가능
                </Button>
                {pageData[selectedPage].hasAccess.map((a, i) => (
                  <Button key={i} type="small_round" color="white_round">
                    {a}
                  </Button>
                ))}
              </S.AccessRights>
            )}
            {pageData && pageData[selectedPage].deniedAccess && (
              <S.AccessRights>
                <Button type="small_round" color="red">
                  접근 불가능
                </Button>
                {pageData[selectedPage].deniedAccess.map((a, i) => (
                  <Button key={i} type="small_round" color="white_round">
                    {a}
                  </Button>
                ))}
              </S.AccessRights>
            )}
          </S.AccessBox>
        </S.LRBox>
        <S.LRBox width="56.25%">
          <S.Wrap>
            <FileBranch width={19.2} height={19.2} />
            <S.InnerBoxTitle>Scenario</S.InnerBoxTitle>
          </S.Wrap>
          <S.Scenario>
            {pageData &&
              pageData[selectedPage].scenarios &&
              pageData[selectedPage].scenarios.map((a, i) => (
                <S.ScenarioText key={i}>
                  {i + 1}. {a}
                </S.ScenarioText>
              ))}
          </S.Scenario>
        </S.LRBox>
      </S.InnerBox>
    </>
  );
}

export default ProjectStructure;
