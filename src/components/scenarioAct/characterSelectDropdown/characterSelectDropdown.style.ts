import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 160px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  background: ${({ theme }) => theme.colors.primary.pri_900};
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_18};
`;
