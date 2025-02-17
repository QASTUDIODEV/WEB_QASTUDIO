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

  max-height: 280px;
  overflow-y: auto;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

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
