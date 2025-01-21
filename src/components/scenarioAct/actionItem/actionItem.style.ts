import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionName = styled.div`
  ${({ theme }) => theme.text.medium_20};
  height: 100%;
  margin-right: 10px;
`;
