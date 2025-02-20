import styled from 'styled-components';

const NormalInputWrapper = styled.input`
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  height: 51.2px;
  width: 100%;
  padding: 12.8px 16px;
  border-radius: 3.2px;
  border: 0.8px solid rgba(153, 153, 153, 0.5);
  background-color: inherit;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_300};
    ${({ theme }) => theme.text.medium_18};
    font-size: 16px;
  }
`;

const ThinInputWrapper = styled.input`
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  height: 100%;
  width: 100%;
  padding: 8px;
  border-radius: 6.4px;
  border: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};
  background-color: inherit;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.gray_300};
    ${({ theme }) => theme.text.medium_18};
    font-size: 16px;
  }
`;

export { NormalInputWrapper, ThinInputWrapper };
