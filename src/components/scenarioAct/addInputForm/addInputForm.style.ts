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
export const DivideInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
export const AddButton = styled.div<{ disabled?: boolean }>`
  height: 40px;
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
