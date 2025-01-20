import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary.pri_900}
  box-shadow: 10px 20px 100px 0px rgba(35, 104, 232, 0.2);
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  height: 100%;
`;
