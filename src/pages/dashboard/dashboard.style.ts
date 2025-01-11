import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Flex = styled.div`
  ${({ theme }) => theme.align.column_start};
  gap: 15px;
  padding-top: 20px;
`;

export { Container, Flex };
