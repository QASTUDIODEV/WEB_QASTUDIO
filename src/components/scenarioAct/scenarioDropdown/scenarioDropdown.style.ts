import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const ScenarioHeader = styled.div`
  height: 56px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  align-items: center;
  display: flex;

  justify-content: space-between;
`;
export const Title = styled.div`
  margin-left: 8px;
  flex: 1;
  ${({ theme }) => theme.text.medium_24};
`;
export const ActionList = styled.div``;

export const ActionDescription = styled.div`
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.point.point_1};
  padding: 8px 30px;
`;
