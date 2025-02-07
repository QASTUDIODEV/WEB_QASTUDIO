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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    transform-origin: center;
    animation: ${spin} 1.2s cubic-bezier(0.4, 0.4, 0.2, 1) infinite;
  }
`;
