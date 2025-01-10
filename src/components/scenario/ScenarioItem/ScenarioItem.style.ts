import styled from 'styled-components';

export const ScenarioItem = styled.div<{ isChecked: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  border-radius: 4px;
  background: ${({ isChecked }) => (isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit')};
`;

export const ScenarioItemLeftSide = styled.div`
  display: flex;
  gap: 8px;
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
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
`;
