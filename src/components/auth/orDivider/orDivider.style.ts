import styled from 'styled-components';

const Line = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray_500};
  width: 170px;
  height: 0.1px;
  gap: 0px;
  border: 1px 0px 0px 0px;
`;

const Container = styled.div`
  ${({ theme }) => theme.align.row_center}
  position: relative;
  gap: 10px;
  width: 180px;
  height: 10px;
  span {
    ${({ theme }) => theme.align.row_center};
    ${({ theme }) => theme.text.medium_14};
    color: ${({ theme }) => theme.colors.gray.gray_300};
    z-index: 2;
    width: 60px;
  }
`;

export { Container, Line };
