import Plus from '@/assets/icons/add.svg?react';
import Locate from '@/assets/icons/location_arrow.svg?react';
import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';

export default function ProjectInfoPage() {
  return (
    <S.Container>
      <S.BoxContainer>
        <S.Left>
          <S.Profile>
            <S.ProfileImg />
            <S.ProfileName>ProjectName</S.ProfileName>
          </S.Profile>
          <S.Box height="17.2413%" padding="2.155172% 3.23276%">
            <S.Title>Introduction to the Project</S.Title>
            <S.Text>Please upload the project</S.Text>
          </S.Box>
          <S.Box height="43.1034%" padding="2.155172% 3.23276%">
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
          <S.Box height="23.0603%" padding="2.155172% 3.23276%">
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
          <S.Profile>
            <S.ProfileImg />
            <S.ProfileName>ProjectName</S.ProfileName>
          </S.Profile>
          <S.Box height="64.65518%" padding="5.882352% 8.82352%">
            <S.Title>Team Members</S.Title>
            <S.TextBtn width="38.82352941%" height="7.833333333%" padding="2.941176471% 5.882352941%">
              <Plus />
              <span className="text">Invite</span>
            </S.TextBtn>
          </S.Box>
          <S.Box height="23.06034%" padding="5.882352% 8.82352%">
            <S.Title>View QA Sheet</S.Title>
            <S.Text>Check the QA sheet</S.Text>
            <S.TextBtn width="40.33333333%" height="21.96261%" padding="2.941176471% 5.882352941%">
              <Locate />
              <span className="text">Locate</span>
            </S.TextBtn>
          </S.Box>
        </S.Right>
      </S.BoxContainer>
    </S.Container>
  );
}
