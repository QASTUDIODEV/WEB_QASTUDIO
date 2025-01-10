import Button from '@/components/common/button/button';

import * as S from '@/pages/projectInfo/projectStructure.style.ts';

import Plus from '@/assets/icons/add.svg?react';
import Branch from '@/assets/icons/branch.svg?react';
import FileBranch from '@/assets/icons/file_branch.svg?react';
import Rights from '@/assets/icons/rights.svg?react';

type TProjectStructureProps = {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  onBackToSummary: () => void;
};

function ProjectStructure({ selectedPage, setSelectedPage, onBackToSummary }: TProjectStructureProps) {
  type TData = {
    page: string[];
    path: string[];
    character: string[];
    accessRights: boolean[][];
  };

  const initialData: TData = {
    page: ['홈', '로그인', '로드맵', '마이페이지'],
    path: ['/', '/login', '/roadmap', '/mypage'],
    accessRights: [
      [true, true, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
    ],
    character: ['일반', '관리자', '비로그인'],
  };

  const data = { ...initialData };
  const getPageDetails = () => {
    const pageIndex = data.page.indexOf(selectedPage);
    if (pageIndex !== -1) {
      return {
        path: data.path[pageIndex],
      };
    }
    return null;
  };

  const pageDetails = getPageDetails();
  const accessed: string[][] = new Array(data.page.length).fill(null).map(() => []);
  const notAccessed: string[][] = new Array(data.page.length).fill(null).map(() => []);

  data.accessRights.forEach((access, i) => {
    access.forEach((isAccessible, j) => {
      if (isAccessible) {
        accessed[i].push(data.character[j]);
      } else {
        notAccessed[i].push(data.character[j]);
      }
    });
  });

  return (
    <S.Box
      height="64.19117647058824%"
      style={{
        cursor: 'pointer',
      }}
    >
      <S.Title>Project structure</S.Title>
      <S.TitleBox>
        <S.Wrap>
          <S.TextBold>{selectedPage}</S.TextBold>
          {pageDetails && (
            <>
              <Branch />
              <S.Path>{pageDetails.path}</S.Path>
            </>
          )}
        </S.Wrap>
        <S.ButtonWrapper>
          <Button
            type="small_square"
            color="white_square"
            onClick={() => {
              onBackToSummary();
            }}
          >
            전체
          </Button>
          {data.page.map((p, i) => (
            <Button
              type="small_square"
              color={selectedPage === p ? 'selected' : 'white_square'}
              key={i}
              onClick={() => {
                setSelectedPage(p);
              }}
            >
              {p}
            </Button>
          ))}
        </S.ButtonWrapper>
      </S.TitleBox>
      {pageDetails && (
        <S.TextLight>
          <br />
          {selectedPage} 페이지 설명
          <br />
          (두줄까지 들어갈 수 있습니다.)
        </S.TextLight>
      )}
      <S.Wrapper top="16px" right="24px">
        <Plus />
      </S.Wrapper>
      <S.InnerBox>
        <S.LRBox width="41.66666667%">
          <S.Wrap>
            <Rights />
            <S.InnerBoxTitle>Access rights</S.InnerBoxTitle>
          </S.Wrap>
          <S.AccessBox>
            {accessed[data.page.indexOf(selectedPage)] && (
              <S.AccessRights>
                <Button type="small_round" color="green">
                  접근 가능
                </Button>
                {accessed[data.page.indexOf(selectedPage)].map((a, index) => (
                  <Button key={index} type="small_round" color="white_round">
                    {a}
                  </Button>
                ))}
              </S.AccessRights>
            )}
            {notAccessed[data.page.indexOf(selectedPage)] && (
              <S.AccessRights>
                <Button type="small_round" color="red">
                  접근 불가능
                </Button>
                {notAccessed[data.page.indexOf(selectedPage)].map((a, index) => (
                  <Button key={index} type="small_round" color="white_round">
                    {a}
                  </Button>
                ))}
              </S.AccessRights>
            )}
          </S.AccessBox>
        </S.LRBox>
        <S.LRBox width="56.25%">
          <S.Wrap>
            <FileBranch />
            <S.InnerBoxTitle>Scenario</S.InnerBoxTitle>
          </S.Wrap>
        </S.LRBox>
      </S.InnerBox>
    </S.Box>
  );
}

export default ProjectStructure;
