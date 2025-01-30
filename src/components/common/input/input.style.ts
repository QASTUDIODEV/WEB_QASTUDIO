import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 41px;
  border-radius: 4px;
`;
const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  display: flex;
  gap: 5px;
  position: relative;
  flex-direction: column;
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

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const MessageWrapper2 = styled.div`
  display: flex;
  position: absolute;
  top: -24px;
  right: 0;
  z-index: 1;
`;

const NormalInputWrapper = styled.input`
  ${({ theme }) => theme.text.medium_20};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  height: 64px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 4px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background-color: inherit;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_300};
  }
`;

const ThinInputWrapper = styled.input`
  ${({ theme }) => theme.text.medium_20};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  height: 50px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  background-color: inherit;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_300};
  }
`;

export { Container, Eyes, Input, InputWrapper, MessageWrapper, MessageWrapper2, NormalInputWrapper, ThinInputWrapper };
