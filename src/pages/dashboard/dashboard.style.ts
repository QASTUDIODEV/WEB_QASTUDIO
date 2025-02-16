import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;
  width: 100%;
  height: 100%;
  padding: 20px 60px 0;

  @media (min-height: 800px) {
    margin-top: 20px;
    gap: 50px;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5%;
`;

export { Container, ContentWrapper, TableWrapper };
