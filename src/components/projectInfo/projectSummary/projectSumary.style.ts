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
export const TextBold = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-size: 22.4px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.448px;
  margin-bottom: 8px;
`;
export const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;
  word-wrap: break-word;
  ${media.desktop`
    font-size: 12px;
  `}
  @media (max-width: 610px) {
    white-space: pre;
  }
`;
export const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
`;
export const InnerBox = styled.div`
  box-sizing: border-box;
  background: rgba(217, 230, 255, 0.05);
  border-radius: 6.4px;
  padding: 7px 10px;
  position: relative;
  overflow: auto;
  height: inherit;
  @media (max-width: 1010px) {
    width: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 6px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
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
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  text-align: left;
`;
export const TR = styled.tr`
  cursor: pointer;
  border-radius: 99px;
  padding: 3.2px 8px;
  &:hover {
    background: rgba(223, 232, 249, 0.1);
  }
`;
export const TD = styled.td`
  padding: 3.2px 8px;
  font-size: 9.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
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
export const AccessRights = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Button = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`;
