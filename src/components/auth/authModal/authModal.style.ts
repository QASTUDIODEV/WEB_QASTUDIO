import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 950px;
  margin-top: 15px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;

  button {
    padding: 7px 20px;
  }
`;

export { ButtonBox, Container };
