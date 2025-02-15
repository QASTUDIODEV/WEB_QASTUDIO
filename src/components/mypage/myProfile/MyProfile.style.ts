import styled from 'styled-components';

type TBannerImg = {
  url?: string;
  $isEdit?: boolean;
};
type TProfileImg = {
  $isEdit?: boolean;
};

export const Container = styled.div`
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

export const ProfileWrapper = styled.div`
  display: flex;
  position: relative;
  height: 45%;
  border-radius: 12.8px;
  width: 100%;
  align-items: end;
  min-height: 155px;
  justify-content: space-between;
  padding: 20px 30px;
`;

export const BannerImg = styled.div<TBannerImg>`
  border-radius: 12.8px;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2) !important;
  background: ${({ url }) =>
    url
      ? `linear-gradient(0deg, rgba(0, 7, 20, 0.8) 0%, rgba(0, 7, 20, 0) 100%), url(${url})`
      : 'linear-gradient(rgba(0, 7, 20, 0) 0%, rgba(0, 7, 20, 0.9) 100%)'};
  background-size: cover;
  background-position: center;
  z-index: 1;
  &:hover {
    cursor: ${({ $isEdit }) => ($isEdit ? 'pointer' : 'default')};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 10px;
  padding: 16px 0;
  gap: 6.4px;
  max-width: 60%;
  z-index: 1;
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

export const Account = styled.div`
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

export const PlusWrapper = styled.button`
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

export const AccoutWrapper = styled.div`
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

export const ButtonWrapper = styled.div`
  z-index: 2;
  align-self: end;
  padding: 5px 0;
  width: fit-content;
  height: fit-content;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const ProfileImg = styled.div<TProfileImg>`
  min-width: 112px;
  min-height: 112px;
  max-width: 112px;
  max-height: 112px;
  border-radius: 100%;
  background-color: #505050;
  ${({ theme }) => theme.align.row_center};
  position: relative;
  z-index: 1;
  &:hover {
    cursor: ${({ $isEdit }) => ($isEdit ? 'pointer' : 'default')};
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ProfileEditBtn = styled.button`
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

export const ProfileUserInfo = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  height: 133px;
  align-items: center;
`;

export const SocialLogoWrapper = styled.div`
  display: flex;
  background-color: rgba(22, 24, 28, 1);
  border: 0.8px solid rgba(8, 38, 89, 1);
  border-radius: 6.4px;
  padding: 8px;
  position: absolute;
  bottom: -55px;
  left: 0;
`;
