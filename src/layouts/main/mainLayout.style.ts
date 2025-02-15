import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  height: 100%;
  min-height: 100vh;
  display: flex;
  width: 100vw;
`;

const OutletWrapper = styled.div`
  flex: 1;
  max-width: 100vw;
  overflow-x: hidden;
  @media (max-width: 1024px) {
    padding-left: 96px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 50px;
  margin-left: 60px;
`;

export { Container, Header, OutletWrapper };
