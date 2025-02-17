import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.5);
  .spinner {
    width: 100px;
    height: 100px;
    z-index: 1002;
    transform-origin: center;
    animation: ${spin} 1.2s cubic-bezier(0.4, 0.4, 0.2, 1) infinite;
  }
`;
