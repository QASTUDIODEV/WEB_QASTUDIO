import styled from 'styled-components';

import { media } from '@/styles/media';

export const ProjectText = styled.p`
  ${({ theme }) => theme.text.medium_24};
  color: #d6deec;
`;
export const ModalBox = styled.div`
  width: 820px;
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
export const Position = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ClearButton = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Btn = styled.div<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 4px;
  background: #d9e6ff1a;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
`;
export const Position2 = styled.div`
  display: flex;
  align-self: flex-end;
`;
