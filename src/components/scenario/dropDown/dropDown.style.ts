import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => theme.text.medium_20};
  color: ${({ theme }) => theme.colors.gray.gray_300};
  height: 64px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 4px;
  border: 0.8px solid rgba(153, 153, 153, 0.5);
  background-color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  border: 0.8px solid rgba(153, 153, 153, 0.5);
  border-radius: 0 0 4px 4px;
  border-top: none;
  z-index: 1000;
  overflow-y: auto;
  max-height: 128px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  flex-direction: column;
`;

export const DropdownListItem = styled.li`
  display: flex;
  height: 64px;
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
  transition: transform 0.3s ease;
`;
