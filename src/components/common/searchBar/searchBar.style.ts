import styled from 'styled-components';

const Container = styled.div`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.align.row_space_between}
  width: 100%;
  padding: 8px;

  input {
    ${({ theme }) => theme.colors.primary.pri_50};
    outline: none;
    width: 80%;
    background-color: transparent;
    border: none;
    ${({ theme }) => theme.text.medium_14};
    color: ${({ theme }) => theme.colors.primary.pri_50};

    &::placeholder {
      color: ${({ theme }) => theme.colors.primary.pri_50};
    }
  }
`;

export { Container };
