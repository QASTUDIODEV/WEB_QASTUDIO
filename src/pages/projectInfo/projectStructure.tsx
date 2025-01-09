import Button from '@/components/common/button/button';

import * as S from '@/pages/projectInfo/projectStructure.style.ts';

import Plus from '@/assets/icons/add.svg?react';

type TProjectStructureProps = {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  onBackToSummary: () => void; // 요약 페이지로 돌아가는 핸들러
};

function ProjectStructure({ selectedPage, setSelectedPage, onBackToSummary }: TProjectStructureProps) {
  type TData = {
    page: string[];
    path: string[];
    character: string[];
    accessRights: boolean[];
  };

  const initialData: TData = {
    page: ['홈', '로그인', '로드맵', '마이페이지'],
    path: ['/', '/login', '/roadmap', '/mypage'],
    accessRights: [true, false],
    character: ['일반', '관리자'],
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

  return (
    <S.Box
      height="64.19117647058824%"
      style={{
        cursor: 'pointer',
      }}
    >
      <S.Title>Project structure</S.Title>
      <S.TitleBox>
        <S.TextBold>{selectedPage}</S.TextBold>
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
          경로: {pageDetails.path}
          <br />
          사용자가 학습 로드맵을 생성하고 이를 직관적으로 확인할 수 있도록 지원합니다.
          <br />
          (두줄까지 들어갈 수 있습니다.)
        </S.TextLight>
      )}
      <S.Wrapper top="16px" right="24px">
        <Plus />
      </S.Wrapper>
      <S.InnerBox>
        <S.Wrapper top="5.6px" right="8px">
          <Plus />
        </S.Wrapper>
      </S.InnerBox>
    </S.Box>
  );
}

export default ProjectStructure;
