import styled from 'styled-components';

export const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  padding: 0px 60px 00px 60px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  flex: 1;
  width: 100%;
  position: relative;
  p {
    color: ${({ theme }) => theme.colors.primary.pri_50};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
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
  margin-bottom: 30px;
`;

export const CharactersContainer = styled.div`
  margin-top: 23.6px;
  background-color: inherit;
  border-radius: 10px;
  height: 60vh;
  overflow-y: scroll;
`;

export const Pagination = styled.div`
  display: flex;
  position: absolute;
  bottom: 6%;
  gap: 8px;
  justify-content: center;
  align-self: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

interface IPageNumberProps {
  $isActive: boolean;
}

export const PageNumber = styled.div<IPageNumberProps>`
  display: flex;
  width: 25.6px;
  height: 25.6px;
  padding: 2px 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${({ $isActive }) => ($isActive ? 'rgba(217, 230, 255, 0.2)' : 'none')};

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
