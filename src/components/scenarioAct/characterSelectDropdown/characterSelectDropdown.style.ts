import styled from 'styled-components';

export const Container = styled.div<{ $isOpen: boolean }>`
  width: 160px;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  ${({ theme }) => theme.text.medium_18};
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-radius: 8px;
  position: relative;
  ${({ $isOpen }) =>
    $isOpen &&
    `
      border-radius: 8px 8px 0px 0px;
    `}
`;

export const Content = styled.div`
  display: flex;
  padding: 10px;
  height: 47px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100%);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 8px 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
`;

export const Option = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.10);' : 'inherit')};
`;
