import { useState } from 'react';

import Button from '@/components/common/button/button';

import Plus from '@/assets/icons/add.svg?react';
import Goto from '@/assets/icons/arrow_goto.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';
import ProjectStructure from '@/pages/projectInfo/projectStructure';

export default function ProjectInfoPage() {
  const [isStructureVisible, setIsStructureVisible] = useState(true); // 화면 전환 상태
  const [selectedPage, setSelectedPage] = useState<string>('홈'); // 현재 선택된 페이지 상태

  const handleBackToSummary = () => {
    setIsStructureVisible(true);
    setSelectedPage('홈'); // 요약 화면으로 돌아오면서 선택된 페이지를 초기화
  };

  return (
    <S.Container>
      <S.Profile>
        <S.ProfileImg />
        <S.ProfileName>UMC_PM_DAY</S.ProfileName>
        <S.Wrapper top="5.6px" right="0">
          <Button type="normal" color="default" icon={<Goto />} iconPosition="right">
            Go to Site
          </Button>
        </S.Wrapper>
      </S.Profile>
      <S.Box height="18%">
        <S.Title>Introduction to the Project</S.Title>
        <S.Text>
          사용자가 학습 로드맵을 생성하고 이를 직관적으로 확인할 수 있도록 지원합니다. <br />
          (두줄까지 들어갈 수 있습니다.)
        </S.Text>
        <S.Wrapper bottom="16px" right="24px">
          <Button type="normal" color="default" icon={<Edit />} iconPosition="left">
            Edit
          </Button>
        </S.Wrapper>
      </S.Box>
      <S.SemiBox>
        <S.Left>
          {isStructureVisible ? (
            <S.Box
              height="64.19117647058824%"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => setIsStructureVisible(false)}
            >
              <S.Title>Project structure</S.Title>
              <S.TextBold>Summary</S.TextBold>
              <S.TextLight>
                사용자가 학습 로드맵을 생성하고 이를 직관적으로 확인할 수 있도록 지원합니다.
                <br />
                (두줄까지 들어갈 수 있습니다.)
              </S.TextLight>
              <S.Wrapper top="16px" right="24px">
                <Plus />
              </S.Wrapper>
              <S.InnerBox>
                <S.Wrapper top="5.6px" right="8px">
                  <Plus />
                </S.Wrapper>
              </S.InnerBox>
            </S.Box>
          ) : (
            <ProjectStructure selectedPage={selectedPage} setSelectedPage={setSelectedPage} onBackToSummary={handleBackToSummary} />
          )}
          <S.Box height="33.6%">
            <S.Title>Character</S.Title>
            <S.CharacterAddBox>
              <Plus />
            </S.CharacterAddBox>
          </S.Box>
        </S.Left>
        <S.Right>
          <S.Box height="100%">
            <S.Title>Team Members</S.Title>
            <S.Wrapper bottom="16px" right="24px">
              <Button type="normal" color="default" icon={<Plus />} iconPosition="left">
                Invite
              </Button>
            </S.Wrapper>
          </S.Box>
        </S.Right>
      </S.SemiBox>
    </S.Container>
  );
}
