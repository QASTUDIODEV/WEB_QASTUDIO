import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 36px;
  gap: 10px;
  background-color: inherit;

  color: ${({ theme }) => theme.colors.primary.pri_50};
  p {
    font-size: 24px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.48px;
  }
`;

export const ProfileWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

export { Container };
