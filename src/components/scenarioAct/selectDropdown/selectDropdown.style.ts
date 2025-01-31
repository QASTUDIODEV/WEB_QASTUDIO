import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  ${({ theme }) => theme.text.medium_18};
`;

export const Header = styled.div<{ $isOpen: boolean; $type: string }>`
  width: 100%;
  display: flex;
  padding: ${({ $type }) => ($type == 'normal' ? '8px' : '2.4px 6.4px')};
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  ${({ theme }) => theme.text.medium_14};
  border: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-radius: ${({ $isOpen }) => ($isOpen ? '6.4px 6.4px 0 0' : '6.4px')};
  border-bottom: ${({ $isOpen }) => ($isOpen ? 'none' : '0.8px solid')};
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  z-index: 1000;
  border-radius: 0px 0px 6.4px 6.4px;
  border: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};

  border-top: none;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const DropdownListItem = styled.li<{ $isSelected: boolean; $type: string }>`
  ${({ theme }) => theme.text.medium_14};
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border-radius: 6.4px;
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.10)' : 'inherit')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
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
