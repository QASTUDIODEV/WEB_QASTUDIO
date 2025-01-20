import styled from 'styled-components';

export const Container = styled.div`
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #001945 0%, #000714 100.13%));
  background-color: red;
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
`;
