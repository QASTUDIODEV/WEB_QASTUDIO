import styled from 'styled-components';

import { media } from '@/styles/media';

export const ModalContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 608px;
  ${media.desktop`
    width: 100%;
  `}
`;

export const description = styled.div`
  ${({ theme }) => theme.text.medium_18};
`;

export const SubTitle = styled.p`
  ${({ theme }) => theme.text.medium_22};
  font-size: 17.6px;
  white-space: nowrap;
`;

export const ValidationWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  right: 0;
`;

export const InputWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 3px;
  position: relative;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const TagContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 8px;
  height: 30px;
`;

//step:2
export const ConfirmModalContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 608px;
  ${media.desktop`
    width: 100%;
  `}
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

export const LoadingContainer2 = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const DescriptionContent = styled.div`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_18};
  font-size: 14.4px;
  width: fit-content;
`;
export const ScenarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
export const MainScenarioWrapper = styled.div`
  display: flex;
  height: 222px;
  padding: 16px;

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
  ${({ theme }) => theme.text.medium_18};
  font-size: 17.6px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RightSideComponents = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const AccessControlItems = styled.div`
  display: flex;
  gap: 5px;
`;
