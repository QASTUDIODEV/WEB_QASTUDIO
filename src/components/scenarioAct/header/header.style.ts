import styled from 'styled-components';

export const Container = styled.div`
  background: var(--primary-pri_back_grad, linear-gradient(76deg, #001945 0%, #000714 100.13%));
  background-color: red;
  padding-left: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 50vw;
`;

export const UrlText = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
`;
