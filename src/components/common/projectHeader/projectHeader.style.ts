import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 60px 0px 60px;
  gap: 10px;
  justify-content: space-between;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
  @media (max-width: 610px) {
    display: none;
  }
`;

export const RightSideButton = styled.div`
  display: flex;
  @media (max-width: 820px) {
    display: none;
  }
`;

export const LeftSideComponents = styled.div`
  display: flex;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 700;
`;
