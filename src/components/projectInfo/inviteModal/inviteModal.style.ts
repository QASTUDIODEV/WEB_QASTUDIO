import styled from 'styled-components';

import { media } from '@/styles/media';

export const ProjectText = styled.p`
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;
export const ModalBox = styled.div`
  width: 688px;
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
export const ModalText2 = styled.p`
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const tagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 860px;
  max-height: 38px;
  overflow: auto;
`;
export const Position = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;
export const LoadingContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
