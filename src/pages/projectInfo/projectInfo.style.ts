import styled from 'styled-components';

const Container = styled.div`
  color: #d6deec;
  background: var(--primary-pri_900, #000714);
  width: 100%;
  flex: 1;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.813rem;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ProfileName = styled.p`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.48px;
`;

const Box = styled.div<{ height: string; padding: string }>`
  height: ${(props) => props.height};
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: ${(props) => props.padding};
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

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 6.375% 7.5% 3.125% 7.5%;
  display: flex;
`;

const Title = styled.p`
  color: var(--primary-pri_50, #dfe8f9);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.44px;
`;

const Text = styled.p`
  color: var(--gray-gray_300, #999);
  padding-top: 1.960784%;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;
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

export { Box, BoxContainer, Container, Left, Profile, ProfileImg, ProfileName, Right, Text, TextBtn, Title };
