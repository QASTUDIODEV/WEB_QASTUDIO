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
  margin-bottom: 36px;
`;

export const CharactersContainer = styled.div`
  margin-top: 20px;
  background-color: inherit;
  border-radius: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  position: absolute;
  bottom: 6%;
  left: 50%;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const PageNumber = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 2px 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: rgba(217, 230, 255, 0.2);
`;
