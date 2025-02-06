import styled from 'styled-components';

export const CharacterHeaderLeftSide = styled.div`
  display: flex;
  gap: 6.4px;
  width: fit-content;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const IconContainer = styled.div`
  width: 19.2px;
  height: 19.2px;
  margin-right: 6.4px;
  z-index: 10;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
`;

export const Container2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 16px;
`;

export const CharacterHeader = styled.div<{ $isChecked: boolean; $isEdit: boolean; $isSelected?: boolean }>`
  display: flex;
  padding: 24px 16px;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 8px;

  cursor: ${({ $isEdit }) => ($isEdit ? 'auto' : 'pointer')};
  border-top: ${({ $isEdit }) => ($isEdit ? '0.8px solid rgba(217, 230, 255, 0.2)' : 'none')};
  background: ${({ $isSelected, $isChecked, $isEdit }) =>
    $isEdit ? 'inherit' : $isSelected ? 'linear-gradient(76deg, #001945 0%, #000714 100.13%)' : $isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit'};
`;

export const CharacterHeaderRightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: right;
`;
export const Creater = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 93px;
  ${({ theme }) => theme.text.medium_14};
  p {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 130px;
  ${({ theme }) => theme.text.medium_14};
`;

export const CharacterTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;
