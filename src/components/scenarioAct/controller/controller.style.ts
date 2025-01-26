import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  min-width: 500px;
`;
//시나리오 실행
export const ActContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  //box-shadow: 10px 20px 100px 0px rgba(35, 104, 232, 0.2);
  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_20};
  height: 100%;
`;

export const Header = styled.div`
  padding: 20px 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.text.bold_24};
  border-bottom: 1px solid rgba(217, 230, 255, 0.1);
`;
export const CharacterHeader = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.text.medium_24};
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 31px;
  right: 30px;
`;
export const DropdownContainer = styled.div`
  width: 160px;
  height: 47px;
`;
export const ScenarioLIst = styled.div`
  display: flex;
  flex-direction: column;
`;

// 시나리오 추가
export const AddContainer = styled.div``;
