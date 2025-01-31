import styled from 'styled-components';

export const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  padding: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  p {
    color: ${({ theme }) => theme.colors.primary.pri_50};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: inherit;
  overflow-x: auto;
  max-width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 54px;
`;

export const CharactersContainer = styled.div`
  margin-top: 23.6px;
  background-color: inherit;
  border-radius: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  position: absolute;
  bottom: 6%;
  left: 50%;
  gap: 8px;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const PageNumber = styled.div`
  display: flex;
  width: 25.6px;
  height: 25.6px;
  padding: 2px 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: rgba(217, 230, 255, 0.2);
  ${({ theme }) => theme.text.medium_14};
`;

export const IconContainer = styled.div`
  width: 19.2px;
  height: 19.2px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
