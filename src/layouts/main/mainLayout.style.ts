import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};

  height: 100%;
  min-height: 100vh;
  display: flex;
`;

export { Container };
