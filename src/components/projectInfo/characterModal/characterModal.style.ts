import styled from 'styled-components';

import { media } from '@/styles/media';

export const ModalContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 608px;
  ${media.desktop`
    width: 100%;
  `}
`;

export const description = styled.div`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 28.8px */
  letter-spacing: 0.384px;
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 26.4px */
  letter-spacing: 0.352px;
`;

export const InputWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

export const ConfirmModalContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 850px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DescriptionItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 40px;
`;

export const DescriptionContent = styled.div`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
`;
export const ScenarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MainScenarioWrapper = styled.div`
  display: flex;
  height: 277px;
  padding: 20px;
  border-radius: 6.4px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 5px;
  overflow-y: auto;
  background: rgba(217, 230, 255, 0.05);
`;
export const ScenarioDescription = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 26.4px */
  letter-spacing: 0.352px;
`;
