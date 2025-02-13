import styled from 'styled-components';

const Container = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  width: fit-content;
  display: flex;
  flex-direction: column;

  border-radius: 6.4px;
  border: 0.8px solid #082659;
  background: #16181c;

  max-height: 300px;
  overflow-y: auto;

  li {
    ${({ theme }) => theme.text.medium_14};
    width: 100%;
    border-radius: 6.4px;
    padding: 8px 16px;
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export { Container };
