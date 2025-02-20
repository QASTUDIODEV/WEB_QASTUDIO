import styled from 'styled-components';

type TBannerImg = {
  url?: string;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-self: center;
  height: 100vh;
  flex-direction: column;
  padding: 30px;
  max-width: 1200px;
  gap: 20px;
  overflow-y: scroll;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
const ProfileWrapper = styled.div`
  display: flex;
  position: relative;
  height: 45%;
  border-radius: 12.8px;
  width: 100%;
  align-items: end;
  min-height: 155px;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  gap: 20px;
  z-index: 1;
  height: 133px;
  align-items: center;
  .hover {
    &:hover {
      cursor: pointer;
    }
  }
`;

const BannerImg = styled.div<TBannerImg>`
  border-radius: 12.8px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2) !important;
  background: ${({ url }) =>
    url
      ? `linear-gradient(0deg, rgba(0, 7, 20, 0.8) 0%, rgba(0, 7, 20, 0) 100%), url(${url})`
      : 'linear-gradient(rgba(0, 7, 20, 0) 0%, rgba(0, 7, 20, 0.9) 100%)'};
  background-size: cover;
  background-position: center;
  &:hover {
    cursor: pointer;
  }
`;

const InputValidateWrapper = styled.div`
  position: relative;
  display: flex;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 10px;
  padding: 16px 0;
  gap: 6.4px;
  max-width: 60%;
  span {
    color: ${({ theme }) => theme.colors.primary.pri_50};
    font-size: 38.4px;
    font-weight: 700;
    line-height: 57.6px;
    letter-spacing: 0.02em;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;

const Account = styled.div`
  display: flex;
  font-size: 19.2px;
  font-weight: 500;
  font-family: Pretendard;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const PlusWrapper = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: rgba(217, 230, 255, 0.2);
  border-radius: 79.2px;
  border: none;
  svg {
    width: 10.97px;
    height: 10.97px;
  }
  @media (max-width: 625px) {
    display: none;
  }
`;

const AccoutWrapper = styled.div`
  display: flex;
  height: 26px;
  width: 100%;
  align-items: center;
  .socialLogoWrapper {
    @media (max-width: 690px) {
      display: none;
    }
  }
`;

const ProjectNum = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(76.11deg, #001945 0%, #000714 100.13%);
  padding: 32px 24px;
  gap: 16.8px;
  border-radius: 12.8px;
  max-width: 184px;
  height: 210px;
  svg {
    width: 51.2px;
    height: 51.2px;
  }
  .ProjectNumber {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
  }
  span {
    font-size: 14.4px;
  }
`;

const Projects = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  background: #d9e6ff1a;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  height: auto; /* 자동으로 크기 조정 */
  border-radius: 12.8px;
  overflow-x: scroll;
`;

const Table = styled.table`
  width: 100%;
  height: auto;
  table-layout: auto;
  .right {
    padding-right: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  z-index: 2;
  align-self: end;
  padding: 5px 0;
  @media (max-width: 560px) {
    display: none;
  }
`;

const TH = styled.th`
  ${({ theme }) => theme.text.medium_18}
  text-align: left;
  height: 26px;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const TD = styled.td`
  ${({ theme }) => theme.text.medium_14}
  height: 26px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  flex: none;
  svg {
    width: 19.2px;
    height: 19.2px;
  }
`;

const ProjectNameTD = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  ${({ theme }) => theme.text.medium_14}
  .ProfileWrapper {
    width: 19.2px;
    height: 19.2px;
  }
`;

const TR = styled.tr`
  height: 26px;
`;

const TBody = styled.tbody`
  height: auto;
  gap: 8px;
`;

const ProfileImg = styled.div`
  min-width: 112px;
  min-height: 112px;
  max-width: 112px;
  max-height: 112px;
  border-radius: 100%;
  background-color: #505050;
  ${({ theme }) => theme.align.row_center};
  position: relative;
  z-index: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`;
const MessageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -24px;
  left: 0;
`;

const ProfileEditBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.point.point_2};
  border-radius: 100%;
  ${({ theme }) => theme.align.row_center};
  position: absolute;
  width: 44.8px;
  height: 44.8px;
  top: 67.2px;
  left: 67.2px;
  padding: 9.6px 8.8px 9.6px 10.4px;
  gap: 0px;
  border-radius: 79.2px;
  opacity: 0px;

  border: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  height: 152px;
`;

const ProfileUserInfo = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const SocialLogoWrapper = styled.div`
  display: flex;
  background-color: rgba(22, 24, 28, 1);
  border: 0.8px solid rgba(8, 38, 89, 1);
  border-radius: 6.4px;
  padding: 8px;
  position: absolute;
  bottom: -55px;
  left: 0;
`;

export {
  Account,
  AccoutWrapper,
  BannerImg,
  Buttons,
  ButtonWrapper,
  Container,
  Container2,
  InputValidateWrapper,
  LoadingOverlay,
  MessageWrapper,
  PlusWrapper,
  Profile,
  ProfileEditBtn,
  ProfileImg,
  ProfileUserInfo,
  ProfileWrapper,
  ProjectList,
  ProjectNameTD,
  ProjectNum,
  Projects,
  SocialLogoWrapper,
  Table,
  TBody,
  TD,
  TH,
  TR,
  UserInfo,
};
