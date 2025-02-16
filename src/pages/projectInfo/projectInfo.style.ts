import styled from 'styled-components';

import { media } from '@/styles/media';

export const Container = styled.div`
  color: #d6deec;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  height: 100vh;
  overflow: auto;
  padding: 3% 6% 2% 6%;
  display: flex;
  flex-direction: column;
  min-width: 410px;
  min-height: 780px;
  ${media.desktop`
    .show {
      opacity: 0;
    }
    margin-bottom: 30px;
  `}
  @media (max-width: 610px) {
    .buttonShow {
      opacity: 0;
    }
  }
  @media (max-width: 1300px) {
    overflow: auto;
  }
`;
export const Box = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  min-height: 100px;
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #0e2245 0%, #000714 100.13%));
  border-radius: 8px;
  padding: 16px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 0.8px solid rgba(32, 75, 153, 0.2);
`;
export const Left = styled.div`
  width: 75%;
  gap: 6%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${media.desktop`
    width: 100%;
    height: 75%;
  `}
`;
export const Right = styled.div`
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
    height: 50%;
    margin: 40px 0 0 0;
  `}
`;
export const SemiBox = styled.div`
  display: flex;
  height: 70%;
  margin-top: 3%;
  ${media.desktop`
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  `}
`;
