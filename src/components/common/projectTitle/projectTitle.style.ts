import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 36px;
  gap: 10px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  p {
    ${({ theme }) => theme.text.medium_24};
  }
`;

export const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.384px;
`;
export const IconContainer = styled.div`
  width: 25.6px;
  height: 25.6px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
