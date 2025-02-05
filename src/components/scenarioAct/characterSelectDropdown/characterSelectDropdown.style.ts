import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.text.medium_18};
  height: 47px;
`;

export const Header = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary.pri_900};

  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-radius: ${({ $isOpen }) => ($isOpen ? '8px 8px 0 0' : '8px')};
  border-bottom: ${({ $isOpen }) => ($isOpen ? 'none' : '1px solid')};
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  z-index: 1000;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-top: none;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const DropdownListItem = styled.li<{ $isSelected: boolean }>`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.10)' : 'inherit')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
