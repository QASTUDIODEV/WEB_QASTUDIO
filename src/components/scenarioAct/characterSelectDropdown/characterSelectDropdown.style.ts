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
      border-bottom: 1px solid transparent;
    `}
`;

export const Content = styled.div<{ $isOpen: boolean }>`
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
  left: -0.5px;
  right: -0.5px;
  width: 160px;
  background: ${({ theme }) => theme.colors.primary.pri_900};
  z-index: 1000;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  border-top: none;
`;

export const Option = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(255, 255, 255, 0.10);' : 'inherit')};
`;
