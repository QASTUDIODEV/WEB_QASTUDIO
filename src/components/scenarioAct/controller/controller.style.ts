import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  min-width: 500px;
`;

export const ActContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  height: 100%;
`;

export const Header = styled.div`
  padding: 16px 24px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.text.bold_24};
  font-size: 19.2px;
  border-bottom: 0.8px solid rgba(217, 230, 255, 0.1);
`;
export const CharacterHeader = styled.div`
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.text.medium_24};
  font-size: 19.2px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

export const ScenarioLIst = styled.div`
  display: flex;
  flex-direction: column;
`;

// 시나리오 추가
export const AddContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const IconContainer = styled.div`
  cursor: pointer;
  width: 19.2px;
  height: 19.2px;
  display: flex;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;
