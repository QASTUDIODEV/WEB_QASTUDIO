import Plus from '@/assets/icons/add.svg?react';
import Locate from '@/assets/icons/location_arrow.svg?react';
import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';

export default function ProjectInfoPage() {
  return (
    <S.Container>
      <S.Profile>
        <S.ProfileImg />
        <S.ProfileName>ProjectName</S.ProfileName>
      </S.Profile>
      <S.Box height="18%">
        <S.Title>Introduction to the Project</S.Title>
        <S.Text>
          사용자가 학습 로드맵을 생성하고 이를 직관적으로 확인할 수 있도록 지원합니다. <br />
          (두줄까지 들어갈 수 있습니다.)
        </S.Text>
      </S.Box>
      <S.SemiBox>
        <S.Left>
          <S.Box height="64.19117647058824%">
            <S.Title>Add Project File</S.Title>
            <S.Text>
              Please enter the project folder for AI to understand the project.
              <br />
              Please compress and enter the React JS/TS file.
            </S.Text>
            <S.TextBtn width="27.7409%" height="11.75%" color="#0D409D">
              <Upload />
              <span className="text">Upload Project File (.zip)</span>
            </S.TextBtn>
          </S.Box>
          <S.Box height="33.6%">
            <S.Title>Add Character</S.Title>
            <S.Text>
              Please set up a user character to use the service.
              <br />
              AI automatically creates appropriate scenarios.
            </S.Text>
            <S.TextBtn width="25.88235294%" height="21.96261%">
              <Plus />
              <span className="text">Create New Character</span>
            </S.TextBtn>
          </S.Box>
        </S.Left>
        <S.Right>
          <S.Box height="100%">
            <S.Title>Team Members</S.Title>
            <S.TextBtn width="38.82352941%" height="7.833333333%">
              <Plus />
              <span className="text">Invite</span>
            </S.TextBtn>
          </S.Box>
        </S.Right>
      </S.SemiBox>
    </S.Container>
  );
}
