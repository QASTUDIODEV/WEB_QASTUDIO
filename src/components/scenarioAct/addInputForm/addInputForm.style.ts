import styled from 'styled-components';

export const Container = styled.div``;

export const InputContainer = styled.div`
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 0.8px solid rgba(217, 230, 255, 0.1);
`;

export const InputTitle = styled.div`
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
`;

export const SelectToggle = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
`;
export const Select = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  ${({ theme }) => theme.text.medium_24};
  font-size: 19.2px;
  border-bottom: ${({ $active, theme }) => ($active ? `0.8px solid ${theme.colors.primary.pri_50}` : 'none')};
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 24px;
`;
export const DivideInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;
export const AddButton = styled.div<{ disabled?: boolean }>`
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(217, 230, 255, 0.1);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  bottom: 31px;
  right: 30px;
  ${({ theme }) => theme.text.medium_20};
  font-size: 18px;
`;

export const ButtonWrapper = styled.div`
  background-color: rgba(223, 232, 249, 0.1);
  border-radius: 3px;
  padding: 6px;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
