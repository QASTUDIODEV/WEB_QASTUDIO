import styled from 'styled-components';

const TextWrapper = styled.div`
  ${({ theme }) => theme.align.column_center};
  gap: 10px;
  padding: 0 15px;
  text-align: center;
  word-break: break-keep;

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

export { TextWrapper };
