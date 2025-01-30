import styled from 'styled-components';

export const ScenarioItem = styled.div<{ $isChecked: boolean; $isSelected?: boolean; $isEdit?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  border-radius: 4px;
  background: ${({ $isSelected, $isChecked }) =>
    $isSelected ? 'linear-gradient(76deg, #001945 0%, #000714 100.13%)' : $isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit'};
  cursor: ${({ $isEdit }) => ($isEdit ? 'auto' : 'pointer')};
`;
export const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;
export const ScenarioItemLeftSide = styled.div`
  display: flex;
  gap: 8px;
  min-width: 100px;
`;
export const ScenarioRightSide = styled.div`
  display: flex;
  gap: 40px;
`;

export const Creater = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 93px;
  ${({ theme }) => theme.text.medium_18};
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 195px;
  ${({ theme }) => theme.text.medium_18};
`;
export const ScenarioTitle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.text.medium_20};
`;
