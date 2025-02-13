import styled from 'styled-components';

import { media } from '@/styles/media';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  min-width: 500px;
  ${({ theme }) => theme.align.column_center};
  background: ${({ theme }) => theme.colors.primary.pri_900};
  position: relative;
`;

export const Error = styled.div`
  width: 100%;
  height: 100vh;
  ${({ theme }) => theme.align.column_center};
  ${({ theme }) => theme.text.bold_32};
`;

export const Title = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 28.8px */
  letter-spacing: 0.384px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  margin-bottom: 0.5208333333%;
`;

export const Text = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  color: ${({ theme }) => theme.colors.gray.gray_300};
  margin-bottom: 2.083333333%;
`;
export const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
export const Box = styled.div`
  position: relative;
`;
export const ProfileWrapper = styled.div`
  position: absolute;
  top: 82px;
  left: 72px;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.813rem;
  margin-bottom: 33.6px;
  position: relative;
`;

export const Wrapper = styled.div`
  min-width: 25.6px;
  min-height: 25.6px;
  width: 25.6px;
  height: 25.6px;
`;

export const ProfileName = styled.p`
  font-family: Pretendard;
  font-size: 19.2px;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;
export const ModalBox = styled.div`
  min-width: 860px;
  width: 860px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${({ theme }) => theme.colors.gray.gray_300};
  ${({ theme }) => theme.text.medium_20};
  ${media.desktop`
    width: 100%;
  `}
`;
export const BtnWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  justify-self: end;
  position: sticky;
  right: 0;
`;
