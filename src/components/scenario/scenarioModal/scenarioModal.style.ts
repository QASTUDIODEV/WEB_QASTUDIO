import styled from 'styled-components';

export const ModalContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 850px;
`;

export const description = styled.div`
  ${({ theme }) => theme.text.medium_24};
`;

export const InputTitle = styled.p`
  ${({ theme }) => theme.text.medium_22};
`;

export const InputWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ButtonWrapper = styled.div`
  width: 104px;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;
