import styled from 'styled-components';

const LoginButtons = styled.div`
  ${({ theme }) => theme.align.row_center};
  width: 300px;
  padding: 10px;
  gap: 20px;
`;
const Logo = styled.div`
  background-color: ${(props) => props.color};
  ${({ theme }) => theme.align.row_center};
  width: 56px;
  height: 56px;
  border-radius: 99px;
  svg {
    width: 25px;
    height: 25px;
  }
`;

export { LoginButtons, Logo };
