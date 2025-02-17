import styled from 'styled-components';

const TextWrapper = styled.div`
  ${({ theme }) => theme.align.column_center};
  padding: 0 15px;
  gap: 40px;
  text-align: center;
  word-break: break-keep;

  div {
    gap: 10px;
  }

  h1 {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.primary.pri_50};
    ${({ theme }) => theme.text.bold_32};
  }

  p {
    ${({ theme }) => theme.text.medium_18};
    color: ${({ theme }) => theme.colors.gray.gray_300};
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.align.row_center};
  gap: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.point.point_2};
  z-index: 701;
  p {
    color: ${({ theme }) => theme.colors.primary.pri_50};
    ${({ theme }) => theme.text.medium_18};
  }
`;

const Header = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  .caution {
    width: 40px;
    height: 40px;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 700;
`;

export { Button, Container, Header, TextWrapper };
