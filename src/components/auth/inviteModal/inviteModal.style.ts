import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.gray.gray_300};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  button {
    padding: 10px 20px;
  }
`;

export { ButtonBox, Container };
