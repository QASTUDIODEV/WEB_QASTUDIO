import styled from 'styled-components';

import { ACTION_STATE } from '@/enums/enums';

export const Container = styled.div<{ $isError: boolean }>`
  position: relative;
  ${({ $isError }) => $isError && 'margin-bottom: 30px;'};
`;
export const Header = styled.div<{ state: ACTION_STATE; $isLastAction: boolean; $isOpen: boolean }>`
  display: flex;
  padding: 8px 24px;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  ${({ $isOpen }) => $isOpen && 'background-color: rgba(217, 230, 255, 0.05);'};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 9px;
    right: 9px;
    height: 0.8px;
    background-color: ${({ theme, state, $isLastAction }) =>
      $isLastAction
        ? state === ACTION_STATE.SUCCESS
          ? theme.colors.point.point_1
          : state === ACTION_STATE.ERROR
            ? theme.colors.error.error_500
            : 'transparent'
        : 'transparent'};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionName = styled.div`
  ${({ theme }) => theme.text.medium_20};
  height: 100%;
  font-size: 16px;
  margin-right: 10px;
`;

export const UnderIcon = styled.div`
  position: absolute;
  bottom: -19px;
  left: 5.5px;
`;

export const ActionType = styled.div`
  padding: 2.4px 8px;
  border-radius: 3.2px;
  border: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_14};
`;

//상세
export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DescriptionItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7.2px 51.2px;
  gap: 8px;
`;

export const DropdownContainer = styled.div`
  height: 26.8px;
  width: 119.8px;
`;
export const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => theme.text.medium_14};
`;
export const Input = styled.input`
  padding: 4px 10px;
  ${({ theme }) => theme.text.medium_14};
  border: none;
  border-bottom: 0.8px solid ${({ theme }) => theme.colors.primary.pri_50};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  background-color: inherit;
  outline: none;
  width: 200px;
  margin-bottom: 5px;
`;

export const CheckError = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme }) => theme.colors.error.error_500};
  cursor: pointer;
  right: 24px;
`;

export const IconContainer = styled.div`
  width: 19.2px;
  height: 19.2px;
  display: flex;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;
