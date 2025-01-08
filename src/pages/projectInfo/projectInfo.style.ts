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

const TextBtn = styled.button<{ width: string; height: string; color?: string; padding?: string }>`
  display: flex;
  gap: 3.53356%;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  bottom: 5%;
  right: 3.23276%;
  background: ${(props) => props.color || 'rgba(223, 232, 249, 0.1)'};
  padding: ${(props) => props.padding || '0.98039% 1.960784%'};
  border-radius: 8px;
  border: none;

  .text {
    color: #dfe8f9;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SemiBox = styled.div`
  display: flex;
  height: 100%;
  margin-top: 32px;
`;

export { Box, Container, Left, Profile, ProfileImg, ProfileName, Right, SemiBox, Text, TextBtn, Title };
