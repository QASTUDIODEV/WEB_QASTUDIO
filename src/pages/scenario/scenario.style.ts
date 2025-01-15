import styled from 'styled-components';

export const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 1005px;
  p {
    color: ${({ theme }) => theme.colors.primary.pri_50};
    font-size: 18px;
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
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.48px;
  }
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

// 모달
export const ModalContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 1000px;
`;

export const description = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.48px;
`;

export const InputTitle = styled.p`
  font-size: 22px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.44px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ButtonWrapper = styled.div`
  width: 104px;
`;
