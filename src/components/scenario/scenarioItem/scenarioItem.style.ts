import styled from 'styled-components';

export const ScenarioItem = styled.div<{ $isChecked: boolean; $isSelected?: boolean; $isEdit?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  border-radius: 4px;
  background: ${({ $isSelected, $isChecked }) =>
    $isSelected ? 'linear-gradient(76deg, #001945 0%, #000714 100.13%)' : $isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit'};
  cursor: ${({ $isEdit }) => ($isEdit ? 'auto' : 'pointer')};
`;
export const IconContainer = styled.div`
  width: 19.2px;
  height: 19.2px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
export const ScenarioItemLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 6.4px;
  min-width: 100px;
`;
export const ScenarioRightSide = styled.div`
  display: flex;
  gap: 32px;
`;

export const Creater = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 6.4px;
  width: 74.6px;
  ${({ theme }) => theme.text.medium_14};
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 174px;
  ${({ theme }) => theme.text.medium_14};
`;
export const ScenarioTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
`;
