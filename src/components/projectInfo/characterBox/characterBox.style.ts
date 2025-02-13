import styled from 'styled-components';

import { media } from '@/styles/media';

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  min-height: 20px;
  letter-spacing: 0.352px;
  margin-bottom: 12px;
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
export const Character = styled.div`
  display: flex;
  height: 95%;
  width: 100%;
  align-items: center;
  gap: 16px;
  @media (max-width: 720px) {
    overflow: hidden;
    &:hover {
      overflow: overlay;
    }
  }
  ${media.desktop`
    align-items: flex-start;
    height: 100%;
  `}
`;
export const CharacterList = styled.div`
  width: 85%;
  height: 97%;
  max-height: fit-content;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  ${media.desktop`
    height: 100%;
  `}
  &:hover {
    overflow: overlay;
  }
`;
export const CharacterBox = styled.div`
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
  ${media.desktop`
    height: 90%;
    flex-wrap: wrap;
  `}
`;
export const TooltipWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 1000;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
export const CharacterName = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 85%;
`;
export const ChDescript = styled(CharacterName)`
  font-size: 11.2px;
  letter-spacing: 0.224px;
`;
export const rowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const CharacterAddBox = styled.div`
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
  ${media.desktop`
    height: 90%;
  `}
`;
