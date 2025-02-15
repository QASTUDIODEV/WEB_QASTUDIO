import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 650px;
  max-width: 1000px;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.gray.gray_300};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 30px;
  gap: 10px;

  button {
    padding: 7px 20px;
  }
`;

export { ButtonBox, Container };
