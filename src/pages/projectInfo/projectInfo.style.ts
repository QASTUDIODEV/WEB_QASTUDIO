import styled from 'styled-components';

import { media } from '@/styles/media';

export const Container = styled.div`
  color: #d6deec;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  height: calc(100vh - 100px);
  padding: 3% 6% 3% 6%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 410px;
  min-height: 650px;
  @media (max-width: 1380px) {
    min-height: calc(100vh + 100px);
    margin-bottom: 30px;
  }
  ${media.desktop`
    .show {
      opacity: 0;
    }
    height: 100%;
  `}
  @media (max-width: 610px) {
    .buttonShow {
      opacity: 0;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 6px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 6px;
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
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #ffffff26;
    }
  }
  ${media.desktop`
    max-height: 500px;
  `}
  flex-grow: 1;
`;
export const CharacterBox = styled(Box)`
  min-height: 200px;
  max-height: 214px;
`;
export const ChartBox = styled(Box)`
  min-height: 300px;
`;
export const Left = styled.div`
  width: 75%;
  gap: 6%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${media.desktop`
    width: 100%;
    min-height: 55%;
    flex-grow: 1
    gap: 4%;
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
    min-height: 40%;
    flex-grow: 1;
    margin: 4% 0 0 0;
  `}
`;
export const SemiBox = styled.div`
  display: flex;
  height: 80%;
  margin-top: 3%;
  ${media.desktop`
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  `}
`;
