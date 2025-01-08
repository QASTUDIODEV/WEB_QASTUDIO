import styled from 'styled-components';

type TLogoProps = {
  color: string;
  isGithub?: boolean;
};
const LoginButtons = styled.div`
  ${({ theme }) => theme.align.row_center};
  width: 300px;
  padding: 10px;
  gap: 20px;
`;
const Logo = styled.div<TLogoProps>`
  background-color: ${(props) => props.color};
  ${({ theme }) => theme.align.row_center};
  width: 56px;
  height: 56px;
  border-radius: 99px;
  svg {
    width: ${({ isGithub }) => (isGithub ? '41px' : '25px')};
    height: ${({ isGithub }) => (isGithub ? '41px' : '25px')};
  }
`;

export { LoginButtons, Logo };
