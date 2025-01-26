import styled from 'styled-components';

import { media } from '@/styles/media';

export const ModalBox = styled.div`
  width: 860px;
  gap: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  ${media.desktop`
    width: 100%;
  `}
`;
export const PostBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const ModalText = styled.p`
  ${({ theme }) => theme.text.medium_22};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;
export const tagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  overflow: auto;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const ProjectText = styled.p`
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;
export const Position = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: flex-end;
`;
