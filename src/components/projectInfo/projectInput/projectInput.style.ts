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

export const Text = styled.p`
  max-width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.288px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85%;
  word-wrap: break-word;
  @media (max-width: 840px) {
    width: 70%;
  }
  @media (max-width: 610px) {
    width: 60%;
    white-space: pre;
  }
`;
export const Wrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 24px;
`;

export const Input = styled.textarea`
  width: 80%;
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
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
