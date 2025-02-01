import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  height: 38px;
`;

export const DropdownHeader = styled.div<{ $hasSelection: boolean; $isOpen: boolean }>`
  ${({ theme }) => theme.text.medium_18};
  font-size: 16px;
  color: ${({ theme, $hasSelection }) => ($hasSelection ? theme.colors.gray.gray_50 : theme.colors.gray.gray_300)};
  height: 100%;
  width: 100%;
  padding: 8px;
  border-radius: ${({ $isOpen }) => ($isOpen ? '8px 8px 0 0' : '8px')};
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-bottom: ${({ $isOpen }) => ($isOpen ? 'none' : '1px solid')};
  background-color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  ${({ theme }) => theme.text.medium_18};
  font-size: 16px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  border: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-radius: 0 0 6.4px 6.4px;
  border-top: none;
  z-index: 1000;
  overflow-y: auto;
  max-height: 78px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  flex-direction: column;
`;

export const DropdownListItem = styled.li`
  display: flex;
  height: 38px;
  width: 100%;
  padding-left: 16px;
  align-items: center;

  cursor: pointer;
  &:hover {
    background: linear-gradient(0deg, rgba(217, 230, 255, 0.1) 0%, rgba(217, 230, 255, 0.1) 100%), #000714;
  }
`;

export const DropdownArrow = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 19.2px;
  height: 19.2px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
