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

export const SelectToggle = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
`;
export const Select = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  ${({ theme }) => theme.text.medium_24};
  border-bottom: ${({ $active, theme }) => ($active ? `1px solid ${theme.colors.primary.pri_50}` : 'none')};
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 30px;
`;
export const DividInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
