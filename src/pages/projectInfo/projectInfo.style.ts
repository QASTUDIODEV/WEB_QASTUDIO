import styled from 'styled-components';

import { media } from '@/styles/media';

const Container = styled.div`
  color: #d6deec;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  height: 100vh;
  overflow: auto;
  padding: 3% 6% 2% 6%;
  display: flex;
  flex-direction: column;
  min-width: 410px;
  ${media.desktop`
    .show {
      opacity: 0;
    }
  `}
  @media (max-width: 610px) {
    .buttonShow {
      opacity: 0;
    }
  }
  @media (max-width: 1300px) {
    overflow: auto;
    padding-bottom: 0%;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.813rem;
  margin-bottom: 31.8px;
  position: relative;
`;

const ProfileWrapper = styled.div`
  min-width: 25.6px;
  min-height: 25.6px;
  width: 25.6px;
  height: 25.6px;
`;

const ProfileName = styled.p`
  font-family: Pretendard;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.384px;
`;
export const MemberBox = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  gap: 4.05%;
  min-width: 150px;
`;
export const MemberName = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
  @media (max-width: 1200px) {
    max-width: 70%;
  }
`;
export const ArrowWrapper = styled.div`
  flex-shrink: 0;
  flex: 1;
`;
export const Member = styled.div`
  ${({ theme }) => theme.align.row_space_between};
  gap: 2.5%;
  cursor: pointer;
  margin-bottom: 20px;
  ${media.desktop`
    width: 70%;
  `}
`;
export const MemberContainer = styled.div`
  overflow: auto;
  max-height: 70%;
`;
const Box = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: 16px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 0.8px solid rgba(32, 75, 153, 0.2);
`;

const Left = styled.div`
  width: 75%;
  gap: 6%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${media.desktop`
    width: 100%;
  `}
`;

const Right = styled.div`
  width: 22.06%;
  overflow: hidden;
  gap: 40px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  margin-left: 2.94112%;
  min-width: 168px;
  ${media.desktop`
    width: 100%;
    height: 100%;
    margin: 40px 0 0 0;
  `}
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.352px;
  margin-bottom: 16px;
  @media (max-width: 530px) {
    width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  ${media.desktop`
    ${({ theme }) => theme.text.medium_14};
    margin-bottom: 10px;
  `}
`;

const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
  white-space: pre;
  ${media.desktop`
    font-size: 8px;
  `}
`;

const Text = styled.p`
  max-width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
  white-space: pre;
  overflow: hidden;
  scrollbar-width: none;
  width: 85%;
  word-wrap: break-word;
  @media (max-width: 840px) {
    width: 70%;
  }
  @media (max-width: 610px) {
    width: 60%;
  }
  @media (max-width: 1400px) {
    font-size: 12px;
  }
`;

const TextBold = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 22.4px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.448px;
  margin-bottom: 8px;
`;

const SemiBox = styled.div`
  display: flex;
  height: 70%;
  margin-top: 3%;
  ${media.desktop`
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  `}
`;

const InnerBox = styled.div`
  box-sizing: border-box;
  background: rgba(217, 230, 255, 0.05);
  border-radius: 6.4px;
  padding: 7px 10px;
  position: relative;
  margin-top: 16px;
  overflow: scroll;
  scrollbar-width: none;
  height: inherit;
  @media (max-width: 1010px) {
    width: 100%;
    height: 100%;
  }
`;

const CharacterAddBox = styled.div`
  ${({ theme }) => theme.align.column_center}
  background: #d9e6ff1a;
  border-radius: 6.4px;
  height: inherit;
  min-width: 112px;
  padding: 12px;
  cursor: pointer;
  svg {
    width: 50%;
    height: 50%;
  }
`;
export const TooltipWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 1000;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const CharacterBox = styled.div`
  position: relative;
  background: #007f7f;
  border-radius: 6.4px;
  width: 112px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 8px;
  cursor: pointer;
`;
const Character = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  gap: 16px;
  @media (max-width: 720px) {
    overflow-x: scroll;
  }
`;
type TWrapperProps = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};

export const Wrapper = styled.div<TWrapperProps>`
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;

export const Input = styled.textarea`
  width: 80%;
  height: 57%;
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  padding: 8px;
  border-radius: 6.4px;
  background: rgba(217, 230, 255, 0.05);
  border: none;
  overflow: 'hidden';
  resize: 'none';
  @media (max-width: 840px) {
    height: 100%;
    width: 70%;
  }
  @media (max-width: 610px) {
    width: 60%;
  }
  @media (max-width: 1400px) {
    font-size: 12px;
  }
`;
type TText = {
  color?: string;
};
export const rowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const Medium18Text = styled.p<TText>`
  color: ${(props) => props.color || '${({ theme }) => theme.colors.white'};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 85%;
`;
export const Medium14Text = styled.p<TText>`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.8px */
  letter-spacing: 0.224px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 85%;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  border-radius: 12.8px;
  gap: 10px;
  height: 283px;
  overflow-x: scroll;
  flex-direction: row;
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  border-collapse: collapse;
  td:first-child {
    border-top-left-radius: 99px;
    border-bottom-left-radius: 99px;
  }

  td:last-child {
    border-top-right-radius: 99px;
    border-bottom-right-radius: 99px;
  }
  svg {
    vertical-align: text-bottom;
  }
  @media (max-width: 1379px) {
    min-width: 700px;
    overflow: scroll;
  }
  @media (max-width: 900px) {
    min-width: 700px;
    overflow: scroll;
  }
`;

export const TH = styled.th`
  height: 22px;
  padding-bottom: 16px;
  background: transparent;
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  text-align: left;
`;
export const TR = styled.tr`
  border-radius: 99px;
  padding: 3.2px 8px;
  &:hover {
    background: rgba(223, 232, 249, 0.1);
  }
`;
export const TD = styled.td`
  padding: 3.2px 8px;
  font-family: Pretendard;
  font-size: 9.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 14.4px */
  letter-spacing: 0.192px;
  color: ${({ theme }) => theme.colors.white};

  &:first-child {
    width: 20%;
  }
  &:nth-child(2) {
    width: 20%;
  }
  &:last-child {
    width: 60%;
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5px;
`;
export const AccessRights = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const ModalBox = styled.div`
  gap: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;
export const PostBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const ModalText = styled.p`
  ${({ theme }) => theme.text.medium_22};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const ProjectText = styled.p`
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;
export const Position = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Button = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`;
export {
  Box,
  Character,
  CharacterAddBox,
  CharacterBox,
  Container,
  InnerBox,
  Left,
  Profile,
  ProfileName,
  ProfileWrapper,
  Right,
  SemiBox,
  Text,
  TextBold,
  TextLight,
  Title,
};
