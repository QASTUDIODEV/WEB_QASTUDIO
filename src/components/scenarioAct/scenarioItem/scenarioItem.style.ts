import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ScenarioHeader = styled.div<{ $isOpen: boolean | undefined }>`
  height: 56px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  ${({ $isOpen }) =>
    $isOpen &&
    `
      background: linear-gradient(76deg, #001945 0%, #000714 100.13%);
    `}
`;

export const Title = styled.div`
  margin-left: 8px;
  flex: 1;
  ${({ theme }) => theme.text.medium_24};
`;

export const ActionList = styled.div`
  border-radius: 0 0 8px 8px;
`;

export const ActionDescription = styled.div`
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.point.point_1};
  padding: 8px 30px;
  background-color: rgba(217, 230, 255, 0.05);
`;
