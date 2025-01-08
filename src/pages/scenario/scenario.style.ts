import styled from 'styled-components';

export const Background = styled.div`
  background-color: inherit;
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  p {
    color: var(--primary-pri_50, #d9e6ff);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.36px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: inherit;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  h1 {
    color: ${({ theme }) => theme.colors.primary.pri_50};
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.48px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

export const CharactersContainer = styled.div`
  margin-top: 20px;
  background-color: inherit;
  border-radius: 10px;
`;

export const Pagination = styled.div`
  display: flex;
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
