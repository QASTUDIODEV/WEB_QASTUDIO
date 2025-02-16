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
