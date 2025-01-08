import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 41px;
  position: relative;
  border-radius: 4px;
`;

const Input = styled.input<{ $isValid?: boolean }>`
  width: 100%;
  height: 41px;
  padding: 0px 0px 0px 10px;
  gap: 10px;
  border-radius: 4px;
  opacity: 0px;
  font-size: 14px;
  border: 1px solid;
  border-color: ${(props) => (props.$isValid === false ? props.theme.colors.error.error_500 : 'none')};
  background-color: ${(props) => (props.$isValid === false ? props.theme.colors.error.error_50 : 'white')};
`;

const Eyes = styled.div<{ $active?: boolean }>`
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 10px;
  svg {
    fill: ${({ $active, theme }) => ($active ? theme.colors.gray.gray_700 : theme.colors.gray.gray_300)};
  }
`;
export { Container, Eyes, Input };
