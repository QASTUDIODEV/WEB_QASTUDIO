import styled from 'styled-components';

type TInputWrapperProps = {
  width?: string;
};

const InputWrapper = styled.input<TInputWrapperProps>`
  ${({ theme }) => theme.text.medium_20};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  height: 64px;
  width: ${(props) => props.width || '820px'};
  padding: 16px 20px;
  border-radius: 4px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background-color: inherit;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_300};
  }
`;

export { InputWrapper };
