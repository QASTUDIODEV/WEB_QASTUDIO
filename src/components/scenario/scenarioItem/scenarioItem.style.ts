import styled from 'styled-components';

export const ScenarioItem = styled.div<{ $isChecked: boolean; $isSelected?: boolean; $isEdit?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  border-radius: 4px;
  cursor: ${({ $isEdit }) => ($isEdit ? 'auto' : 'pointer')};
  border-top: ${({ $isEdit }) => ($isEdit ? '0.8px solid rgba(217, 230, 255, 0.2)' : 'none')};
  background: ${({ $isSelected, $isChecked, $isEdit }) =>
    $isEdit ? 'inherit' : $isSelected ? 'linear-gradient(76deg, #001945 0%, #000714 100.13%)' : $isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit'};
`;

export const IconContainer = styled.div`
  svg {
    width: 19.2px;
    height: 19.2px;
  }
`;
export const ScenarioItemLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 6.4px;
  min-width: 100px;
  padding-left: 20px;
`;
export const ScenarioRightSide = styled.div`
  display: flex;
  gap: 15px;
`;

export const Creater = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 6.4px;
  width: 90px;
  ${({ theme }) => theme.text.medium_14};
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg {
    min-width: 19px;
    min-height: 19px;
  }
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 120px;
  ${({ theme }) => theme.text.medium_14};
`;
export const ScenarioTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
`;
