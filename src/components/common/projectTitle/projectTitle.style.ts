import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 36px;
  gap: 10px;
  background-color: inherit;
  max-width: 80%;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  p {
    ${({ theme }) => theme.text.medium_24};
  }
`;

export const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const IconContainer = styled.div`
  width: 32px;
  height: 32px;
`;
