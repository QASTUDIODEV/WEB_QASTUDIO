import styled from 'styled-components';

export const Content = styled.div`
  position: absolute;
  top: 
  right:
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

const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.8px */
  letter-spacing: 0.224px;
`;

type TWrapperProps = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};
export const Box = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: 16px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
export const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.352px;
  margin-bottom: 16px;
`;

export const TitleBox = styled.div`
  ${({ theme }) => theme.align.row_space_between}
`;
export const ButtonWrapper = styled.div`
  ${({ theme }) => theme.align.row_space_between}
  gap: 8px;
`;
export const Wrapper = styled.div<TWrapperProps>`
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;
const InnerBox = styled.div`
  box-sizing: border-box;
  background: rgba(217, 230, 255, 0.05);
  border-radius: 6.4px;
  padding: 5.6px 8px;
  position: relative;
  margin-top: 16px;
  height: 100%;
  cursor: pointer;
`;

export { InnerBox, TextBold, TextLight };
