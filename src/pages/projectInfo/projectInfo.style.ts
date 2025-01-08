import styled from 'styled-components';

const Container = styled.div`
  color: #d6deec;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  width: 100%;
  flex: 1;
  height: 100vh;
  padding: 6.375% 7.5% 3.125% 7.5%;
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.813rem;
  margin-bottom: 33.6px;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 25.6px;
  height: 25.6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ProfileName = styled.p`
  font-family: Pretendard;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 28.8px */
  letter-spacing: 0.384px;
`;

const Box = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: 16px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  width: 75%;
  gap: 4.310344%;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  width: 22.06%;
  gap: 4.310344%;
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
  margin-bottom: 16px;
`;

const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.8px */
  letter-spacing: 0.224px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
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
  margin-top: 16px;
  height: 100%;
`;

const CharacterAddBox = styled.div`
  background: #d9e6ff1a;
  border-radius: 6.4px;
  height: 100%;
  width: 13.7254902%;
  ${({ theme }) => theme.align.row_center}

  svg {
    width: 50%;
    height: 50%;
  }
`;
const CharacterBox = styled.div`
  background: ${({ theme }) => theme.colors.point.point_1};
  border-radius: 6.4px;
  height: 100%;
  width: 13.7254902%;
  padding: 8px 12px;
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

export { Box, CharacterAddBox, CharacterBox, Container, InnerBox, Left, Profile, ProfileImg, ProfileName, Right, SemiBox, Text, TextBold, TextLight, Title };
