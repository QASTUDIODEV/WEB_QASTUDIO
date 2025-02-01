import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px;
  background: rgba(217, 230, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  font-size: 16px;
  width: 100%;
  align-items: center;
  border-radius: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
`;

export const DelContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 19.2px;
  height: 19.2px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
