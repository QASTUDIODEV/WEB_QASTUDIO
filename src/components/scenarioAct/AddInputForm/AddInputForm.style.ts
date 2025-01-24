import styled from 'styled-components';

export const Container = styled.div``;

export const InputContainer = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid rgba(217, 230, 255, 0.1);
`;

export const InputTitle = styled.div`
  ${({ theme }) => theme.text.medium_20};
`;
