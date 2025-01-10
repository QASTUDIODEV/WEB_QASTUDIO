import styled from 'styled-components';

export const CharacterHeaderLeftSide = styled.div`
  display: flex;
  gap: 8px;
`;
export const CharacterHeader = styled.div<{ isChecked: boolean; isEdit: boolean }>`
  display: flex;
  padding: 30px 20px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 4px;
  border-top: ${({ isEdit }) => (isEdit ? '1px solid rgba(217, 230, 255, 0.2)' : 'none')};
  background: ${({ isChecked }) => (isChecked ? 'rgba(217, 230, 255, 0.05)' : 'inherit')};
`;

export const CharacterHeaderRightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;
export const Creater = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  width: 93px;
`;

export const Elapsed = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
`;
