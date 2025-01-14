import styled from 'styled-components';

const Container = styled.div`
  color: #d6deec;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  width: 100%;
  flex: 1;
  height: 100vh;
  padding: 4.5% 7.5% 3.125% 7.5%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.813rem;
  margin-bottom: 33.6px;
  position: relative;
`;

const ProfileWrapper = styled.div`
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
  ${({ theme }) => theme.text.medium_18};
  ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 83%;
`;
export const ArrowWrapper = styled.div`
  flex-shrink: 0;
  flex: 1;
  width: 10%;
`;
export const Member = styled.div`
  ${({ theme }) => theme.align.row_space_between};
  gap: 2.5%;
  cursor: pointer;
  margin-bottom: 20px;
`;
const Box = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: 20px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Left = styled.div`
  width: 75%;
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 22.06%;
  gap: 40px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  margin-left: 2.94112%;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.352px;
  margin-bottom: 20px;
`;

const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
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
  overflow-y: scroll;
  scrollbar-width: none;
  width: 85%;
  word-wrap: break-word;
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
  height: 100%;
  margin-top: 32px;
`;

const InnerBox = styled.div`
  box-sizing: border-box;
  background: rgba(217, 230, 255, 0.05);
  border-radius: 6.4px;
  padding: 5.6px 8px;
  position: relative;
  margin-top: 25px;
  height: 227px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CharacterAddBox = styled.div`
  ${({ theme }) => theme.align.column_center}
  background: #d9e6ff1a;
  border-radius: 6.4px;
  height: 120px;
  width: 140px;
  padding: 12px;
  cursor: pointer;
  svg {
    width: 50%;
    height: 50%;
  }
`;

const CharacterBox = styled.div`
  background: #007f7f;
  border-radius: 6.4px;
  height: 120px;
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  gap: 8px;
  cursor: pointer;
`;
const Character = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 20px;
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
  width: 85%;
  height: 51%;
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
  scrollbar-width: none;
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
  ${({ theme }) => theme.text.medium_18};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
`;
export const Medium14Text = styled.p<TText>`
  color: ${(props) => props.color};
  ${({ theme }) => theme.text.medium_14};
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
`;

export const TH = styled.th`
  height: 25px;
  padding-bottom: 20px;
  background: transparent;
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  text-align: left;
  flex-direction: row;
`;
export const TR = styled.tr`
  border-radius: 99px;
  padding: 4px 10px;
  &:hover {
    background: rgba(223, 232, 249, 0.1);
  }
`;
export const TD = styled.td`
  padding: 4px 10px;
  ${({ theme }) => theme.text.medium_14};
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
